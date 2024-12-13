// File: Inputs.js
import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

function Inputs({ setQuery, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row my-10 justify-center gap-4 sm:gap-6">
      <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Enter city name..."
          className="text-gray-500 text-xl font-light p-2 w-full capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-full sm:w-1/4 items-center justify-center">
        <button
          className="text-lg sm:text-2xl font-medium mx-1 cursor-pointer transition ease-out hover:scale-125"
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="text-lg sm:text-2xl  font-medium mx-1">|</p>
        <button
          className="text-lg sm:text-2xl  font-medium mx-1 cursor-pointer transition ease-out hover:scale-125"
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;