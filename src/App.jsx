// File: App.js
import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TimeAndDetails from "./components/TimeAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopBox from "./components/TopBox";
import getFormattedWeatherData from "./components/getWeatherData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const [query, setQuery] = useState({ q: "Chennai" }); // Default city
  const [units, setUnits] = useState("metric"); // Default units
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
     
      // Fetch and set weather data
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
      
      // Success toast
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      toast.error("Failed to fetch weather data. Please try again.");
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]); // Runs when `query` or `units` changes.

  return (
    <div className="mx-auto max-w-screen-lg sm:max-w-screen-md lg:max-w-screen-xl mt-4 py-5 px-4 sm:px-8 lg:px-32 bg-gradient-to-br shadow-xl shadow-gray-500 from-cyan-400 to-blue-600">
      <ToastContainer autoClose={2000} 
      theme="colored" 
      hideProgressBar= {true}/>
      <TopBox setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && weather.hourly && weather.daily && (
        <>
          <TimeAndLocation weather={weather} />
          <TimeAndDetails weather={weather} units={units} />
          <Forecast title="3 Hour Step Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
