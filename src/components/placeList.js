export function renderPlaceList(container, places, onPlaceClick) {
  container.innerHTML = "";

  if (!places || !places.length) {
    container.innerHTML = `
      <div class="no-places-card">
        <p>No places match your location and criteria. Try picking another city or expanding the search.</p>
      </div>
    `;
    return;
  }

  places.forEach((place) => {
    const card = document.createElement("div");
    card.className = "place-card glassmorphic";
    card.setAttribute("data-place-id", place.place_id || "");

    // Determine price level
    const priceText = place.price_level !== undefined ? "$".repeat(place.price_level) : "";
    
    // Pick the first two tags to display on the card
    const tagsHtml = (place.tags || [])
      .slice(0, 2)
      .map(tag => `<span class="card-mini-tag">${tag}</span>`)
      .join("");

    // Format distance
    const distText = place.distance !== undefined 
      ? `${(place.distance / 1000).toFixed(2)} km` 
      : "Nearby";

    card.innerHTML = `
      <div class="place-card-main">
        <div class="place-header">
          <h3>${place.name}</h3>
          <span class="rating-badge">⭐ ${place.rating || "N/A"}</span>
        </div>
        <p class="place-vicinity">${place.vicinity.split("(")[0]}</p>
        <div class="place-tags-row">
          ${tagsHtml}
        </div>
        <div class="place-meta">
          <span class="meta-item distance-item">📍 ${distText}</span>
          ${priceText ? `<span class="meta-item price-item">${priceText}</span>` : ""}
          <span class="meta-item status-item ${place.opening_hours?.open_now ? "open" : "closed"}">
            ● ${place.opening_hours?.open_now ? "Open Now" : "Closed"}
          </span>
        </div>
      </div>
      <div class="place-card-action">
        <span class="arrow-icon">→</span>
      </div>
    `;

    card.addEventListener("click", () => {
      // Highlight card active state
      container.querySelectorAll(".place-card").forEach(c => c.classList.remove("active-card"));
      card.classList.add("active-card");

      if (onPlaceClick) {
        onPlaceClick(place);
      }
    });

    container.appendChild(card);
  });
}

