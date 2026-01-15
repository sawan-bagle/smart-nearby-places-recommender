let map;
let userMarker;
let userLocation;

export function initMap(lat, lng) {
  userLocation = { lat, lng };

  const mapContainer = document.getElementById("map");

  map = new google.maps.Map(mapContainer, {
    center: userLocation,
    zoom: 14,
  });

  userMarker = new google.maps.Marker({
    position: userLocation,
    map,
    title: "You are here",
  });
}

export function getMap() {
  return map;
}

export function getUserLocation() {
  return userLocation;
}
