# SKYNTIC — Modern Weather Dashboard

**SKYNTIC** is a modern, responsive weather dashboard built with **React, JavaScript, Vite, and the Open-Meteo API**. It transforms live weather data into a clean and intuitive dashboard with dynamic weather conditions, detailed metrics, and a multi-day forecast.

## ✨ Features

- 🔎 Search weather by city
- 📍 Current-location weather
- 🌡️ Current temperature and weather conditions
- 🌤️ Dynamic weather icons based on weather conditions
- 💧 Humidity information
- 💨 Wind speed
- 🎚️ Atmospheric pressure
- ☀️ UV index
- 📅 5-day weather forecast
- 📊 Structured weather dashboard
- 📱 Responsive and modern interface
- ⚡ Fast client-side experience powered by Vite

## 🛠️ Tech Stack

- **React** — Component-based frontend development
- **JavaScript (ES6+)** — Application logic and data handling
- **Vite** — Development server and production build tooling
- **Node.js & npm** — Runtime environment and package management
- **CSS3** — Responsive styling and visual design
- **React Icons** — Weather and interface icons
- **Open-Meteo API** — Weather and forecast data
- **Open-Meteo Geocoding API** — Location search and coordinates

## 🔄 How It Works

```text
User searches for a city
        ↓
Open-Meteo Geocoding API
        ↓
Latitude & Longitude
        ↓
Weather API
        ↓
Weather & Forecast Data
        ↓
React processes the response
        ↓
Dynamic Dashboard UI

For current-location weather, Skyntic retrieves the user's location coordinates and uses them to fetch the corresponding weather data.

📂 Project Structure
Skyntic/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
🌐 API Integration

Skyntic integrates with the Open-Meteo API to retrieve weather and forecast information.

The application uses:

Geocoding API — Converts city names into geographic coordinates
Weather API — Retrieves current weather conditions
Forecast API — Retrieves upcoming daily weather data

No API key is required.

💡 Key Development Concepts

Skyntic demonstrates practical implementation of:

React functional components
React state management with useState
API requests and asynchronous JavaScript
Dynamic rendering based on API responses
Conditional weather icon rendering
Location-based weather retrieval
Data transformation and presentation
Responsive frontend design
Modern CSS styling
Vite development and production workflows
npm dependency management
Git and GitHub version control
👩‍💻 Author

Mubbshra Akram

BS Information Technology
University of the Punjab

GitHub
