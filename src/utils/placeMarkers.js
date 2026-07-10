import { getMap } from "../components/mapView";

let markers = [];

export function clearMarkers() {
  const map = getMap();
  if (!map) return;

  if (map._isLeaflet) {
    markers.forEach((m) => {
      try {
        map.removeLayer(m);
      } catch (e) {
        console.warn("Failed to remove Leaflet marker:", e);
      }
    });
  } else {
    markers.forEach((m) => m.setMap(null));
  }
  markers = [];
}

export function addPlaceMarkers(map, places, onMarkerClick) {
  clearMarkers();
  if (!map) return;

  places.forEach((place) => {
    // Standardize lat/lng access
    const lat = typeof place.geometry.location.lat === "function" 
      ? place.geometry.location.lat() 
      : place.geometry.location.latVal;
    const lng = typeof place.geometry.location.lng === "function" 
      ? place.geometry.location.lng() 
      : place.geometry.location.lngVal;

    if (isNaN(lat) || isNaN(lng)) return;

    if (map._isLeaflet) {
      // Determine mood for marker style
      let mood = "work";
      if (place.place_id && place.place_id.startsWith("mock_place_")) {
        const parts = place.place_id.split("_");
        mood = parts[2] || "work";
      }

      // Create a gorgeous custom neon marker
      const markerIcon = window.L.divIcon({
        className: "custom-place-marker",
        html: `<div class="neon-pin pin-${mood}" title="${place.name}">
                 <span class="pin-icon">${getMoodEmoji(mood)}</span>
               </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = window.L.marker([lat, lng], { 
        icon: markerIcon, 
        title: place.name 
      }).addTo(map);

      if (onMarkerClick) {
        marker.on("click", () => onMarkerClick(place));
      }

      markers.push(marker);
    } else {
      // Google Maps marker fallback
      const marker = new google.maps.Marker({
        map,
        position: { lat, lng },
        title: place.name,
      });

      if (onMarkerClick) {
        marker.addListener("click", () => onMarkerClick(place));
      }

      markers.push(marker);
    }
  });
}

function getMoodEmoji(mood) {
  switch (mood) {
    case "work": return "💻";
    case "date": return "❤️";
    case "quickbite": return "⚡";
    case "budget": return "💰";
    default: return "📍";
  }
}

