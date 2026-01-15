import { moodRules } from "./moodRules";
import { getDistanceInMeters } from "./distance";

export function filterAndSortPlaces(places, mood, userLocation) {
  const rule = moodRules[mood];
  if (!rule) return places;

  let filtered = places.map((place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const distance = getDistanceInMeters(
      userLocation.lat,
      userLocation.lng,
      lat,
      lng
    );

    return { ...place, distance };
  });

  if (rule.minRating) {
    filtered = filtered.filter(
      (p) => p.rating && p.rating >= rule.minRating
    );
  }

  if (rule.openNow) {
    filtered = filtered.filter(
      (p) => p.opening_hours?.open_now
    );
  }

  if (rule.maxPriceLevel !== undefined) {
    filtered = filtered.filter(
      (p) => p.price_level !== undefined && p.price_level <= rule.maxPriceLevel
    );
  }

  if (rule.maxDistance) {
    filtered = filtered.filter(
      (p) => p.distance <= rule.maxDistance
    );
  }

  if (rule.sortBy === "rating") {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else {
    filtered.sort((a, b) => a.distance - b.distance);
  }

  return filtered;
}
