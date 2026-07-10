# Smart Nearby Places Recommender

A frontend application that recommends nearby places based on user mood
(work, date, quick bite, budget) using location-based filtering and
UX-driven recommendation logic.

---

##  Features

- Mood-based place discovery
- Google Maps integration
- Distance-based sorting
- Rating-aware filtering
- Clean, glassmorphism-inspired UI
- Graceful handling of API limitations

---

##  How It Works

1. User selects a mood
2. App fetches nearby places using Google Places API
3. Places are enriched with distance calculation
4. Results are filtered and sorted based on mood-specific rules
5. Map and list views stay in sync

---

##  Note on Google Maps API

Google Maps and Places APIs require billing to be enabled even for free-tier usage.

To avoid exposing API keys or deploying a partially functional demo, this project
is showcased via screenshots and local execution. When billing is not enabled,
the app runs in a clearly communicated preview mode.

---

##  Screenshot

<img width="1890" height="903" alt="image" src="https://github.com/user-attachments/assets/9fff5bc1-ea9c-49e0-80b8-da0cf7265af4" />

<img width="1894" height="900" alt="image" src="https://github.com/user-attachments/assets/0fb38491-2a8b-4959-8c9c-816db38a1cae" />

---
<img width="1888" height="906" alt="image" src="https://github.com/user-attachments/assets/2191b429-c41b-4b0d-8ab3-135e982a5d8b" />

## 🚀 Run Locally

```bash
npm install
npm run dev

