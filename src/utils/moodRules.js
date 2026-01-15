export const moodRules = {
  work: {
    minRating: 4.0,
    openNow: true,
    keywords: ["cafe", "coworking"],
    sortBy: "distance"
  },
  date: {
    minRating: 4.2,
    openNow: true,
    sortBy: "rating"
  },
  quickbite: {
    maxDistance: 1500,
    sortBy: "distance"
  },
  budget: {
    maxPriceLevel: 1,
    minRating: 3.5,
    sortBy: "distance"
  }
};
