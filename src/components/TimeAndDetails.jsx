import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

function TimeAndDetails({
  weather: {
    details, // Weather condition (e.g., Rain)
    icon, // Weather icon URL
    temp, // Current temperature
    temp_min, // Minimum temperature
    temp_max, // Maximum temperature
    sunrise, // Sunrise time
    sunset, // Sunset time
    speed, // Wind speed
    humidity, // Humidity percentage
    feels_like, // Feels like temperature
  },
  units,
}) {
  // Details to render in vertical layout
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  // Details to render in horizontal layout
  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      {/* Weather Details */}
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      {/* Temperature and Vertical Details */}
      <div className="flex flex-row items-center justify-between py-3">
        <img
          src={icon}
          alt="weather icon"
          className="w-20"
        />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id} className="flex items-center">
              <Icon size={18} className="mr-1" />
              <p>
                {title} : <span className="font-medium ml-1">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Details */}
      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={30} className="mr-1" />
            <p className="font-light ml-1">
              {title} : <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeAndDetails;
