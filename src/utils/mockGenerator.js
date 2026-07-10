const templates = {
  work: [
    {
      name: "The Grid Coworking & Cafe",
      tags: ["Plugs Available", "High-Speed Wi-Fi", "Quiet Zone"],
      rating: 4.8,
      price_level: 2,
      vicinity: "Innovation District",
      review: "Incredibly fast fiber internet, plenty of power outlets, and ergonomic seating. The cold brew is excellent!",
      phone: "+1 (555) 432-8901",
      popularTimes: [15, 30, 65, 80, 95, 85, 50, 20]
    },
    {
      name: "Blend & Brew Cafe",
      tags: ["Aromatic Coffee", "Comfortable Couches", "Great Lighting"],
      rating: 4.5,
      price_level: 2,
      vicinity: "Metro Plaza",
      review: "They have a dedicated silent room for studying/working. Great pastries and friendly staff.",
      phone: "+1 (555) 765-4321",
      popularTimes: [30, 45, 70, 75, 80, 60, 40, 15]
    },
    {
      name: "Athenaeum Library Study Space",
      tags: ["Absolute Silence", "Books & Archives", "Individual Desks"],
      rating: 4.7,
      price_level: 0,
      vicinity: "Cultural Quarter",
      review: "Zero noise, beautiful classic library atmosphere. Excellent desks with reading lamps.",
      phone: "+1 (555) 987-6543",
      popularTimes: [10, 25, 50, 85, 90, 80, 60, 30]
    },
    {
      name: "Byte & Code Developer Hub",
      tags: ["24/7 Access", "Monitor Rental", "Tech Community"],
      rating: 4.9,
      price_level: 3,
      vicinity: "Cyber Plaza",
      review: "A developer's dream. Free-flowing coffee, high-speed connection, and mechanical keyboards to borrow.",
      phone: "+1 (555) 123-4567",
      popularTimes: [20, 40, 60, 80, 90, 95, 85, 60]
    },
    {
      name: "Cozy Corner Tea Nook",
      tags: ["Quiet Ambience", "Premium Matcha", "Window Seating"],
      rating: 4.3,
      price_level: 1,
      vicinity: "Old Town Walkway",
      review: "Quiet little shop with an amazing selection of loose-leaf teas. Perfect for reading or light coding.",
      phone: "+1 (555) 246-8101",
      popularTimes: [10, 35, 55, 65, 70, 75, 50, 25]
    }
  ],
  date: [
    {
      name: "La Bella Vista Rooftop Lounge",
      tags: ["Panoramic Views", "Fine Wine", "Live Jazz Music"],
      rating: 4.7,
      price_level: 3,
      vicinity: "Skyline Boulevard",
      review: "Spectacular views of the skyline. The live jazz band sets a romantic atmosphere. Outstanding service.",
      phone: "+1 (555) 890-1234",
      popularTimes: [5, 15, 30, 60, 85, 95, 100, 80]
    },
    {
      name: "Whispering Pines Candlelit Bistro",
      tags: ["Candlelit Tables", "Fairy Lights", "Organic Cuisine"],
      rating: 4.6,
      price_level: 3,
      vicinity: "Forest Ridge Reserve",
      review: "The garden patio lit by fairy lights is magical. Ideal for anniversaries or deep conversations.",
      phone: "+1 (555) 345-6789",
      popularTimes: [10, 20, 40, 70, 90, 95, 75, 40]
    },
    {
      name: "Amour Cellar & Wine Bar",
      tags: ["Intimate Seating", "Artisanal Cheese", "Sommelier-Selected"],
      rating: 4.8,
      price_level: 4,
      vicinity: "Downtown Historical Arch",
      review: "Hidden gem underground. Excellent curated wine pairings and very cozy brick-lined booths.",
      phone: "+1 (555) 901-2345",
      popularTimes: [0, 10, 25, 55, 85, 95, 98, 60]
    },
    {
      name: "Le Petit Paris Café & Garden",
      tags: ["French Pastries", "Accordion Music", "Rose Garden"],
      rating: 4.4,
      price_level: 2,
      vicinity: "Fountain Promenade",
      review: "Charming atmosphere that transports you directly to Paris. Try the chocolate soufflé!",
      phone: "+1 (555) 567-8901",
      popularTimes: [25, 45, 65, 80, 85, 75, 50, 20]
    },
    {
      name: "Serenade Lakeside Pavilion",
      tags: ["Waterfront Dining", "Fusion Menu", "Soft Acoustic"],
      rating: 4.5,
      price_level: 3,
      vicinity: "Marina Boardwalk",
      review: "Beautiful setting right on the lake. Dining on the wooden deck at sunset is unforgettable.",
      phone: "+1 (555) 234-5678",
      popularTimes: [15, 35, 60, 75, 90, 95, 85, 45]
    }
  ],
  quickbite: [
    {
      name: "Velocity Gourmet Burgers",
      tags: ["5-Min Guarantee", "Juicy Beef Patties", "Craft Soda"],
      rating: 4.3,
      price_level: 2,
      vicinity: "Commercial Street",
      review: "Incredibly fast service. The double cheese burger was piping hot and delicious. Perfect for lunch break.",
      phone: "+1 (555) 678-9012",
      popularTimes: [40, 70, 95, 60, 45, 80, 90, 30]
    },
    {
      name: "Taco Express Alley",
      tags: ["Street Tacos", "Handmade Tortillas", "Spicy Salsa Bar"],
      rating: 4.5,
      price_level: 1,
      vicinity: "Market Corner",
      review: "Authentic, fast, and very cheap. The al pastor tacos are absolute perfection.",
      phone: "+1 (555) 789-0123",
      popularTimes: [30, 60, 85, 70, 50, 85, 95, 40]
    },
    {
      name: "Slice of Heaven Woodfired Pizza",
      tags: ["By the Slice", "Fresh Mozzarella", "Standing Counters"],
      rating: 4.2,
      price_level: 1,
      vicinity: "University Avenue",
      review: "Perfect crispy crust, ready to grab and go. Very popular with students.",
      phone: "+1 (555) 890-5678",
      popularTimes: [20, 50, 80, 85, 60, 75, 90, 50]
    },
    {
      name: "Zesty Bites Lebanese Shawarma",
      tags: ["Wrap & Go", "Famous Garlic Sauce", "Late Night Pitstop"],
      rating: 4.4,
      price_level: 1,
      vicinity: "Gourmet Plaza",
      review: "Deliciously spiced chicken shawarma wraps made in under 2 minutes. The garlic dip is legendary.",
      phone: "+1 (555) 901-6789",
      popularTimes: [15, 30, 55, 70, 65, 85, 100, 80]
    },
    {
      name: "The Salad Bowl Express",
      tags: ["Custom Salads", "Fresh & Organic", "Drive-Thru"],
      rating: 4.1,
      price_level: 2,
      vicinity: "Medical Center Drive",
      review: "Build your own salad in seconds. Super clean, fast, and healthy.",
      phone: "+1 (555) 123-8901",
      popularTimes: [50, 85, 90, 40, 30, 50, 45, 10]
    }
  ],
  budget: [
    {
      name: "The Penny Pincher Diner",
      tags: ["All-Day Breakfast", "Free Coffee Refills", "Huge Portions"],
      rating: 4.2,
      price_level: 1,
      vicinity: "Railway Station Road",
      review: "Gigantic pancakes and bacon for a bargain price. Plus, the coffee cup is never empty!",
      phone: "+1 (555) 456-7890",
      popularTimes: [60, 80, 85, 70, 50, 65, 55, 20]
    },
    {
      name: "Student Corner Cafe & Arcade",
      tags: ["Board Games", "Student Discounts", "Cheap Snacks"],
      rating: 4.3,
      price_level: 1,
      vicinity: "College Boulevard",
      review: "Super cheap milkshakes and fries. They have free board games and arcade machines too.",
      phone: "+1 (555) 567-0123",
      popularTimes: [15, 30, 60, 80, 90, 95, 85, 50]
    },
    {
      name: "Bargain Buffet",
      tags: ["All You Can Eat", "Home-Style Cooking", "Kid-Friendly"],
      rating: 3.9,
      price_level: 1,
      vicinity: "Industrial Main Street",
      review: "Unbelievable price for an all-you-can-eat spread. The fried chicken and mac & cheese are great.",
      phone: "+1 (555) 678-1234",
      popularTimes: [25, 45, 80, 85, 50, 75, 90, 40]
    },
    {
      name: "Nomad Street Food Canteen",
      tags: ["Local Specialities", "No Frills", "Pocket Friendly"],
      rating: 4.1,
      price_level: 1,
      vicinity: "Artisans Market",
      review: "No fancy plates, just incredibly delicious local food at the lowest prices in the city.",
      phone: "+1 (555) 789-2345",
      popularTimes: [30, 50, 75, 90, 70, 85, 95, 60]
    },
    {
      name: "The Economy Kitchen",
      tags: ["Daily Combos", "Fresh & Warm", "Quick Packets"],
      rating: 4.0,
      price_level: 1,
      vicinity: "Commercial District Lane",
      review: "Their lunch boxes are extremely cheap and packed with nutrients. Changes daily.",
      phone: "+1 (555) 890-3456",
      popularTimes: [70, 95, 80, 40, 30, 60, 50, 15]
    }
  ]
};

// Generates procedural mock places around user center coordinates
export function generateMockPlaces(centerLat, centerLng, mood = "work") {
  const selectedTemplates = templates[mood] || templates.work;

  // We want to distribute coordinates within a radius (approx 500m to 1.5km)
  // 0.01 latitude/longitude degrees is approximately 1.1km
  return selectedTemplates.map((tpl, index) => {
    // Determine a semi-deterministic offset based on the index to avoid jumping on every hover, 
    // but random enough to look natural around the center
    const angle = (index * (2 * Math.PI)) / selectedTemplates.length + (Math.random() * 0.2 - 0.1);
    const radius = 0.004 + (index * 0.002) + (Math.random() * 0.001 - 0.0005); // between ~400m and ~1.5km

    const offsetLat = Math.sin(angle) * radius;
    const offsetLng = Math.cos(angle) * radius;

    const lat = centerLat + offsetLat;
    const lng = centerLng + offsetLng;

    return {
      place_id: `mock_place_${mood}_${index}`,
      name: tpl.name,
      rating: tpl.rating,
      price_level: tpl.price_level,
      tags: tpl.tags,
      review: tpl.review,
      phone: tpl.phone,
      popularTimes: tpl.popularTimes,
      geometry: {
        location: {
          lat: () => lat,
          lng: () => lng,
          latVal: lat, // convenience numerical properties
          lngVal: lng
        }
      },
      opening_hours: { open_now: true },
      vicinity: `${tpl.vicinity} (${(radius * 111).toFixed(1)} km away)`
    };
  });
}
