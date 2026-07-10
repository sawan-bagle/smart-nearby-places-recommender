import { drawRoute, clearRoute } from "./mapView";

export function renderPlaceDetails(container, place) {
  if (!container || !place) return;

  container.classList.remove("hidden");
  container.classList.add("active");

  const lat = typeof place.geometry.location.lat === "function" 
    ? place.geometry.location.lat() 
    : place.geometry.location.latVal;
  const lng = typeof place.geometry.location.lng === "function" 
    ? place.geometry.location.lng() 
    : place.geometry.location.lngVal;

  // Render price level as dollar signs
  const priceIndicator = place.price_level !== undefined 
    ? "• " + "$".repeat(place.price_level) 
    : "";

  // Render mood tag badge
  let mood = "work";
  if (place.place_id && place.place_id.startsWith("mock_place_")) {
    const parts = place.place_id.split("_");
    mood = parts[2] || "work";
  }

  // Create list of tag elements
  const tagsHtml = (place.tags || [])
    .map(tag => `<span class="detail-tag">${tag}</span>`)
    .join("");

  // Create simulated popular times chart bars (from 9:00 AM to 9:00 PM in 1.5h intervals, total 8 bars)
  const popularTimes = place.popularTimes || [20, 35, 60, 85, 95, 80, 55, 25];
  const chartLabels = ["9a", "11a", "1p", "3p", "5p", "7p", "9p", "11p"];
  const barsHtml = popularTimes
    .map((val, idx) => `
      <div class="chart-bar-wrapper">
        <div class="chart-bar-fill" style="height: ${val}%" title="Busy level: ${val}% at ${chartLabels[idx]}"></div>
        <span class="chart-bar-label">${chartLabels[idx]}</span>
      </div>
    `)
    .join("");

  container.innerHTML = `
    <div class="details-card-header">
      <div class="details-title-row">
        <h3>${place.name}</h3>
        <button id="close-details-btn" class="close-btn" aria-label="Close details">&times;</button>
      </div>
      <div class="details-meta-row">
        <span class="rating-badge">⭐ ${place.rating || "4.2"}</span>
        <span class="price-level">${priceIndicator}</span>
        <span class="mood-badge badge-${mood}">${mood.toUpperCase()}</span>
      </div>
    </div>

    <div class="details-scroll-content">
      <div class="details-section">
        <div class="detail-address">📍 ${place.vicinity}</div>
        <div class="detail-phone">📞 ${place.phone || "+1 (555) 888-1234"}</div>
      </div>

      <div class="details-section">
        <h4 class="section-title">Special Features</h4>
        <div class="detail-tags-container">
          ${tagsHtml}
        </div>
      </div>

      <div class="details-section">
        <h4 class="section-title">Popular Times (Hourly Activity)</h4>
        <div class="popular-times-chart">
          ${barsHtml}
        </div>
      </div>

      <div class="details-section review-section">
        <h4 class="section-title">Featured Review</h4>
        <p class="featured-review">"${place.review || "Loved the vibes here! Staff is super helpful and it was perfect for my mood."}"</p>
      </div>
    </div>

    <div class="details-footer">
      <button id="route-directions-btn" class="action-btn">
        <span class="btn-icon">🛣️</span>
        <span class="btn-text">Draw Walking Route</span>
      </button>
    </div>
  `;

  // Attach event listeners
  const closeBtn = container.querySelector("#close-details-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      container.classList.remove("active");
      container.classList.add("hidden");
      clearRoute();
    });
  }

  let routingActive = false;
  const routeBtn = container.querySelector("#route-directions-btn");
  if (routeBtn) {
    routeBtn.addEventListener("click", () => {
      if (routingActive) {
        clearRoute();
        routeBtn.classList.remove("active-routing");
        routeBtn.querySelector(".btn-text").textContent = "Draw Walking Route";
        routingActive = false;
      } else {
        drawRoute(lat, lng);
        routeBtn.classList.add("active-routing");
        routeBtn.querySelector(".btn-text").textContent = "Clear Route Path";
        routingActive = true;
      }
    });
  }
}
