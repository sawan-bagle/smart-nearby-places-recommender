let markers = [];

export function clearMarkers() {
  markers.forEach((m) => m.setMap(null));
  markers = [];
}

export function addPlaceMarkers(map, places) {
  clearMarkers();

  places.forEach((place) => {
    if (!place.geometry?.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
    });

    markers.push(marker);
  });
}
