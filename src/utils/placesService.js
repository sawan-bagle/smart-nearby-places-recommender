export function fetchNearbyPlaces(map, location, type = "restaurant") {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(map);

    const request = {
      location,
      radius: 3000,
      type,
    };

    service.nearbySearch(request, (results, status) => {
        console.log("PLACES STATUS:", status);

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results);
        } else {
            reject({
                status,
                message: "Places API request failed",
            });
        }
    });

  });
}
