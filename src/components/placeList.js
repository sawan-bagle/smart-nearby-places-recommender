export function renderPlaceList(container, places) {
  container.innerHTML = "";

  if (!places.length) {
    container.innerHTML = "<p>No places found for this mood.</p>";
    return;
  }

  places.forEach((place) => {
    const div = document.createElement("div");
    div.className = "place-card";

    div.className = "place-card";

    div.innerHTML = `
        <div class="place-header">
            <h3>${place.name}</h3>
            <span class="rating">⭐ ${place.rating || "N/A"}</span>
        </div>

        <div class="place-meta">
            <span>📍 ${(place.distance / 1000).toFixed(2)} km</span>
            <span class="${place.opening_hours?.open_now ? "open" : "closed"}">
            ${place.opening_hours?.open_now ? "Open now" : "Closed"}
             </span>
        </div>
    `;



    container.appendChild(div);
  });
}
