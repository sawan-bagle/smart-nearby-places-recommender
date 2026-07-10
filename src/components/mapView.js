let map;
let userMarker;
let userLocation;
let activeRouteLine;

export function initMap(lat, lng) {
  userLocation = { lat, lng };
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return;

  // If map is already initialized, just update the center and the user's position marker
  if (map) {
    panToLocation(lat, lng);
    if (map._isLeaflet && userMarker) {
      userMarker.setLatLng([lat, lng]);
    } else if (userMarker && typeof userMarker.setPosition === "function") {
      userMarker.setPosition({ lat, lng });
    }
    return;
  }

  // Clear map container before re-initializing (important for Leaflet to avoid "Map already initialized" error)
  mapContainer.innerHTML = "";

  // 1. Try to load Leaflet first (Zero-cost, fully featured, dark-theme styled)
  if (typeof window.L !== "undefined") {
    console.log("Initializing Leaflet Map (CartoDB Dark Matter)...");
    
    map = window.L.map(mapContainer, {
      zoomControl: false // We will style and position zoom later or rely on standard interactions
    }).setView([lat, lng], 14);

    map._isLeaflet = true;

    // Add CartoDB Dark Matter dark tiles
    window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20
    }).addTo(map);

    // Custom pulsing user marker
    const userIcon = window.L.divIcon({
      className: "custom-user-marker",
      html: `<div class="user-pulse-dot"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    userMarker = window.L.marker([lat, lng], { 
      icon: userIcon, 
      title: "You are here" 
    }).addTo(map);

    return;
  }

  // 2. Fallback to Google Maps if Leaflet isn't loaded and google is available
  if (typeof google !== "undefined" && google.maps) {
    console.log("Initializing Google Maps...");
    map = new google.maps.Map(mapContainer, {
      center: userLocation,
      zoom: 14,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        // ... custom dark style if needed, but we keep it simple
      ]
    });

    userMarker = new google.maps.Marker({
      position: userLocation,
      map,
      title: "You are here",
    });
  }
}

export function drawRoute(destLat, destLng) {
  if (!map || !userLocation) return;

  clearRoute();

  if (map._isLeaflet) {
    const points = [
      [userLocation.lat, userLocation.lng],
      [destLat, destLng]
    ];

    activeRouteLine = window.L.polyline(points, {
      color: "#a78bfa", // violet-400
      dashArray: "6, 8",
      weight: 4,
      opacity: 0.9,
      className: "animated-route-path" // Styled in CSS for dash-dash animation!
    }).addTo(map);

    // Zoom map to fit both user location and the selected place with some padding
    const bounds = window.L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
  } else if (typeof google !== "undefined" && google.maps) {
    // Google Maps polyline fallback
    activeRouteLine = new google.maps.Polyline({
      path: [
        { lat: userLocation.lat, lng: userLocation.lng },
        { lat: destLat, lng: destLng }
      ],
      geodesic: true,
      strokeColor: "#8b5cf6",
      strokeOpacity: 0.8,
      strokeWeight: 4,
      map: map
    });
  }
}

export function clearRoute() {
  if (!map) return;

  if (map._isLeaflet && activeRouteLine) {
    map.removeLayer(activeRouteLine);
    activeRouteLine = null;
  } else if (activeRouteLine && typeof activeRouteLine.setMap === "function") {
    activeRouteLine.setMap(null);
    activeRouteLine = null;
  }
}

export function panToLocation(lat, lng) {
  if (!map) return;

  if (map._isLeaflet) {
    map.setView([lat, lng], 15, { animate: true });
  } else if (typeof map.panTo === "function") {
    map.panTo({ lat, lng });
    map.setZoom(15);
  }
}

export function getMap() {
  return map;
}

export function getUserLocation() {
  return userLocation;
}

