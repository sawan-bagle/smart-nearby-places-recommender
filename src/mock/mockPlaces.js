export const mockPlaces = [
  {
    name: "Blue Tokai Coffee",
    rating: 4.4,
    price_level: 2,
    geometry: {
      location: {
        lat: () => 28.6562,
        lng: () => 77.2276,
      },
    },
    opening_hours: { open_now: true },
    vicinity: "Cafe • Coffee",
  },
  {
    name: "Budget Bites",
    rating: 3.8,
    price_level: 1,
    geometry: {
      location: {
        lat: () => 28.655,
        lng: () => 77.229,
      },
    },
    opening_hours: { open_now: true },
    vicinity: "Fast Food",
  },
  {
    name: "Romantic Rooftop",
    rating: 4.6,
    price_level: 3,
    geometry: {
      location: {
        lat: () => 28.657,
        lng: () => 77.224,
      },
    },
    opening_hours: { open_now: false },
    vicinity: "Fine Dining",
  },
  {
    name: "Quick Snack Corner",
    rating: 4.0,
    price_level: 1,
    geometry: {
      location: {
        lat: () => 28.654,
        lng: () => 77.226,
      },
    },
    opening_hours: { open_now: true },
    vicinity: "Bakery",
  },
];
