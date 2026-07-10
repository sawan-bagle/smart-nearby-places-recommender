import "./style.css";
import { renderMoodSelector } from "./components/moodSelector";
import { initMap, getMap, getUserLocation, panToLocation, clearRoute } from "./components/mapView";
import { loadGoogleMaps } from "./utils/loadGoogleMaps";
import { fetchNearbyPlaces } from "./utils/placesService";
import { renderPlaceList } from "./components/placeList";
import { addPlaceMarkers } from "./utils/placeMarkers";
import { filterAndSortPlaces } from "./utils/filterPlaces";
import { renderPlaceDetails } from "./components/placeDetails";

// Track mouse position for dynamic ambient spotlight glow
window.addEventListener("mousemove", (e) => {
  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
});

// Preset coordinates
const CITIES = {
  mumbai: { lat: 19.0760, lng: 72.8777, name: "Mumbai, IN" },
  delhi: { lat: 28.6562, lng: 77.2276, name: "Delhi NCR, IN" },
  sf: { lat: 37.7749, lng: -122.4194, name: "San Francisco, US" },
  london: { lat: 51.5074, lng: -0.1278, name: "London, UK" },
  tokyo: { lat: 35.6762, lng: 139.6503, name: "Tokyo, JP" }
};

// Application State
let currentCoordinates = CITIES.mumbai; // default center
let activeMood = null;
let currentPlaces = [];

// DOM reference
const app = document.querySelector("#app");
const detailsPanel = document.getElementById("details-panel");

// Inject standard layout
app.innerHTML = `
  <div class="dashboard-header glassmorphic">
    <div class="brand">
      <div class="pulse-indicator"></div>
      <div>
        <h1>Smart Nearby Places</h1>
        <p class="subtitle">Discover curated spots matching your vibe</p>
      </div>
    </div>
    <div class="header-controls">
      <div class="coords-badge" id="active-coords">LAT: 19.0760 | LNG: 72.8777</div>
      <div class="select-wrapper">
        <label for="city-select">📍 Explore:</label>
        <select id="city-select" aria-label="Select Area">
          <option value="mumbai">Mumbai, IN</option>
          <option value="delhi">Delhi NCR, IN</option>
          <option value="sf">San Francisco, US</option>
          <option value="london">London, UK</option>
          <option value="tokyo">Tokyo, JP</option>
          <option value="gps">My Location (GPS)</option>
        </select>
      </div>
    </div>
  </div>

  <div class="mood-section-card glassmorphic">
    <h3>What is your vibe today?</h3>
    <p class="mood-instruction">Select a mood to discover curated spots matched to your environment</p>
    <div id="mood-selector"></div>
  </div>

  <div class="dashboard-grid">
    <div class="map-card glassmorphic">
      <div id="map"></div>
    </div>
    
    <div class="places-card glassmorphic">
      <div class="list-header-bar">
        <h3 id="list-title">Select mood to discover spots</h3>
        <span class="count-badge hidden" id="place-count">0 spots</span>
      </div>
      <div id="places-list">
        <div class="welcome-placeholder">
          <div class="placeholder-spark">✨</div>
          <p>Choose a mood above to generate smart suggestions around your location.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="dashboard-footer glassmorphic">
    <p><strong>Developer Note:</strong> To prevent Google Places API billing overhead, this showcase uses Leaflet Maps and a location-aware procedural mock generator. This demonstrates the UX routing, coordinate updates, and vibe filtering logic at zero runtime API cost.</p>
  </div>
`;

// DOM elements
const citySelect = document.getElementById("city-select");
const listTitle = document.getElementById("list-title");
const placeCount = document.getElementById("place-count");
const placesListContainer = document.getElementById("places-list");
const moodSelectorContainer = document.getElementById("mood-selector");

// Update coordinate text indicator
function updateCoordsDisplay(lat, lng) {
  const coordsDisplay = document.getElementById("active-coords");
  if (coordsDisplay) {
    coordsDisplay.textContent = `LAT: ${lat.toFixed(4)} | LNG: ${lng.toFixed(4)}`;
  }
}

// Init application map
function startApp() {
  initMap(currentCoordinates.lat, currentCoordinates.lng);
  updateCoordsDisplay(currentCoordinates.lat, currentCoordinates.lng);
  
  // Try loading Google Maps silently in the background. 
  // It won't crash if it fails because mapView & placesService default to Leaflet & mock generator.
  loadGoogleMaps()
    .then(() => console.log("Google Maps loaded successfully"))
    .catch(() => console.warn("Google Maps load failed. Using Leaflet Map."));
}

// Render mood chips
renderMoodSelector(moodSelectorContainer, (mood) => {
  activeMood = mood;
  document.body.className = `vibe-${mood}`;
  updatePlacesList();
});

// Update places based on active coordinates and active mood
async function updatePlacesList() {
  if (!activeMood) return;

  // Clear directions polyline
  clearRoute();
  if (detailsPanel) {
    detailsPanel.classList.add("hidden");
    detailsPanel.classList.remove("active");
  }

  listTitle.textContent = `Vibes: ${activeMood.toUpperCase()}`;
  placesListContainer.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Searching for local spots...</p>
    </div>
  `;

  const map = getMap();
  const location = getUserLocation() || currentCoordinates;

  try {
    // Fetch places: falls back to mock procedural coordinates if no key/API fails
    const rawPlaces = await fetchNearbyPlaces(map, location, activeMood);
    
    // Sort and filter according to pricing/ratings
    currentPlaces = filterAndSortPlaces(rawPlaces, activeMood, location);

    // Update count badge
    placeCount.textContent = `${currentPlaces.length} spots`;
    placeCount.classList.remove("hidden");

    // Add markers to map with click event listener
    addPlaceMarkers(map, currentPlaces, handlePlaceSelection);

    // Render list
    renderPlaceList(placesListContainer, currentPlaces, handlePlaceSelection);

  } catch (error) {
    console.error("Error loading places:", error);
    placesListContainer.innerHTML = `
      <div class="error-state">
        <p>Could not search places at this location. Please try again.</p>
      </div>
    `;
  }
}

// Action when a place card or map pin is selected
function handlePlaceSelection(place) {
  const lat = typeof place.geometry.location.lat === "function" 
    ? place.geometry.location.lat() 
    : place.geometry.location.latVal;
  const lng = typeof place.geometry.location.lng === "function" 
    ? place.geometry.location.lng() 
    : place.geometry.location.lngVal;

  // 1. Pan map to place
  panToLocation(lat, lng);

  // 2. Open details overlay drawer
  if (detailsPanel) {
    renderPlaceDetails(detailsPanel, place);
  }

  // 3. Highlight corresponding item in list
  const listCard = document.querySelector(`.place-card[data-place-id="${place.place_id}"]`);
  if (listCard) {
    listCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    
    document.querySelectorAll(".place-card").forEach(c => c.classList.remove("active-card"));
    listCard.classList.add("active-card");
  }
}

// Watch city dropdown change
citySelect.addEventListener("change", async (e) => {
  const selection = e.target.value;

  if (selection === "gps") {
    if ("geolocation" in navigator) {
      placesListContainer.innerHTML = `
        <div class="loading-state">
          <p>Waiting for GPS coordinates...</p>
        </div>
      `;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          currentCoordinates = { lat: latitude, lng: longitude };
          
          initMap(latitude, longitude);
          updateCoordsDisplay(latitude, longitude);
          if (activeMood) {
            updatePlacesList();
          } else {
            placesListContainer.innerHTML = `
              <div class="welcome-placeholder">
                <p>📍 Location updated! Now select a mood to check nearby spots.</p>
              </div>
            `;
          }
        },
        (error) => {
          console.warn("Geolocation access denied:", error.message);
          alert("Location permission denied. Reverting to Mumbai.");
          citySelect.value = "mumbai";
          triggerCitySelection("mumbai");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      citySelect.value = "mumbai";
    }
  } else {
    triggerCitySelection(selection);
  }
});

function triggerCitySelection(cityKey) {
  const coords = CITIES[cityKey];
  if (coords) {
    currentCoordinates = coords;
    initMap(coords.lat, coords.lng);
    updateCoordsDisplay(coords.lat, coords.lng);
    if (activeMood) {
      updatePlacesList();
    }
  }
}

// Start application
startApp();

