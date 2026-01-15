import "./style.css";
import { renderMoodSelector } from "./components/moodSelector";
import { initMap, getMap, getUserLocation } from "./components/mapView";
import { loadGoogleMaps } from "./utils/loadGoogleMaps";
import { fetchNearbyPlaces } from "./utils/placesService";
import { renderPlaceList } from "./components/placeList";
import { addPlaceMarkers } from "./utils/placeMarkers";
import { filterAndSortPlaces } from "./utils/filterPlaces";

// App state
let selectedMood = null;

// DOM references
const app = document.querySelector("#app");

// Initial HTML
app.innerHTML = `
  <div class="header">
    <h1>Smart Nearby Places Recommender</h1>
    <p>Select a mood to discover places around you.</p>

    <div id="mood-selector"></div>
  </div>
  <div id="map-wrapper">
    <div id="map"></div>
    <div id="map-overlay" class="hidden">
      <div class="overlay-card">
        <h3>Map Preview Mode</h3>
        <p>
          Live Google Maps data requires billing to be enabled.
          This demo focuses on UX, filtering logic, and system design.
        </p>
      </div>
    </div>
  </div>



  <div id="places-list"></div>
`;

// Initialize Mood Selector
const moodContainer = document.getElementById("mood-selector");

renderMoodSelector(moodContainer, async (mood) => {
  selectedMood = mood;

  const map = getMap();
  const location = getUserLocation();
  const listContainer = document.getElementById("places-list");

  // UX feedback even if API fails
  listContainer.innerHTML = `
    <p>Searching places for <strong>${mood.toUpperCase()}</strong>...</p>
  `;

  if (!map || !location) return;

  try {
    const rawPlaces = await fetchNearbyPlaces(map, location);
    const processed = filterAndSortPlaces(rawPlaces, mood, location);

    addPlaceMarkers(map, processed);
    renderPlaceList(listContainer, processed);
  } catch (err) {
    console.error("Places API Error:", err);

    // 👉 ACTIVATE MAP PREVIEW MODE
    document
      .getElementById("map-overlay")
      ?.classList.remove("hidden");

    listContainer.innerHTML = `
      <div class="info-card warning">
        <strong>Live places unavailable</strong>
        <p>
          Google Places API requires billing.
          This demo focuses on UX, filtering logic,
          and system design.
        </p>
      </div>
    `;
  }

});

// Load Google Maps first, then get location
loadGoogleMaps()
  .then(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation error:", error.message);

          // Fallback location (Mumbai)
          initMap(19.0760, 72.8777);
          alert("Location permission denied. Showing default city location.");
        }
      );
    } else {
      alert("Geolocation not supported in this browser.");
    }
  })
  .catch(() => {
    alert("Failed to load Google Maps.");
  });
