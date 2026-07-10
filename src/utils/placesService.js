import { generateMockPlaces } from "./mockGenerator";

export function fetchNearbyPlaces(map, location, mood = "work") {
  return new Promise((resolve) => {
    const lat = typeof location.lat === "function" ? location.lat() : location.lat;
    const lng = typeof location.lng === "function" ? location.lng() : location.lng;
    const cleanLocation = { lat, lng };

    // If google maps places is not loaded or we are using Leaflet, fallback immediately
    if (
      typeof google === "undefined" ||
      !google.maps ||
      !google.maps.places ||
      !map ||
      map._isLeaflet // Leaflet map indicator
    ) {
      console.log("Mock Mode Active: Generating procedural places for", mood);
      resolve(generateMockPlaces(cleanLocation.lat, cleanLocation.lng, mood));
      return;
    }

    try {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: cleanLocation,
        radius: 3000,
        type: "restaurant",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          resolve(results);
        } else {
          console.warn("Google Places failed with status:", status, "- Falling back to Mock Generator");
          resolve(generateMockPlaces(cleanLocation.lat, cleanLocation.lng, mood));
        }
      });
    } catch (err) {
      console.warn("Google Places exception - Falling back to Mock Generator:", err);
      resolve(generateMockPlaces(cleanLocation.lat, cleanLocation.lng, mood));
    }
  });
}
