# React Weather App 🌦️

A responsive weather application built using **React**, **Vite**, and **Tailwind CSS**, with real-time weather data fetched from the **OpenWeatherMap API**. The app allows users to search for weather conditions in any city and displays hourly and daily forecasts.

## Features

- 🌍 **Real-time Weather Data**: Fetches current, hourly, and daily weather conditions.
- 🌡️ **Units Toggle**: Switch between Celsius (°C) and Fahrenheit (°F).
- 🕒 **Local Time Display**: Displays the local time of the selected city.
- 🌐 **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices.
- 🔥 **React Toastify Notifications**: Provides user feedback with notifications.

---

## Demo

https://weatherandforecast002.netlify.app/

---

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **API**: OpenWeatherMap API
- **Icons**: React Icons
- **Utilities**: Luxon for date and time manipulation
- **Containerization & Deployment**: Docker, GitHub Actions, AWS EC2

Installation & Running Locally

Clone the repository:

git clone https://github.com/Vimala2020/NewWeatherApp.git
cd NewWeatherApp


Install dependencies:

npm install


Create a .env file in the root:

VITE_APP_API_KEY=your_openweathermap_api_key
VITE_APP_BASE_URL=https://api.openweathermap.org/data/2.5


Run the app locally:

npm run dev


Access it at http://localhost:5173 (or the port Vite provides).

Docker Deployment

Build the Docker image:

docker build -t username/new-weather-app:latest .


Run the container:

docker run -d -p 80:80 \
  -e VITE_APP_API_KEY=your_openweathermap_api_key \
  -e VITE_APP_BASE_URL=https://api.openweathermap.org/data/2.5 \
  username/new-weather-app:latest


**Access the app in a browser:**
http://<EC2-PUBLIC-IP>


**CI/CD Pipeline**

GitHub Actions workflow automatically:

Builds the Docker image

Pushes it to Docker Hub

Optionally deploys to EC2

This setup demonstrates full DevOps workflow: code → build → container → deployment.

Screenshots

<img width="1509" height="988" alt="Screenshot 2025-12-06 at 11 48 02 PM" src="https://github.com/user-attachments/assets/ca0d9ee0-7d30-4c09-a7c5-c879f2d67eaf" />

Future Improvements

Add geolocation to fetch weather automatically based on user location

Add forecast charts for better visualization

Deploy using Kubernetes for scalability

Enable HTTPS for secure access

**License**

This project is open-source and free to use.

---



