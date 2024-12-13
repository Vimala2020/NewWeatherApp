import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error("Environment variables VITE_APP_API_KEY or VITE_APP_BASE_URL are missing");
}

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log("Constructed URL:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

const formatToLocaleTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs, { zone: "utc" })
    .plus({ seconds: offset })
    .toFormat(format);
};

const iconFromUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrent = (data) => {
  if (!data || !data.coord) {
    throw new Error("Invalid weather data response");
  }

  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset } = {},
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0] || {};

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt: formatToLocaleTime(dt, timezone),
    country,
    sunrise: formatToLocaleTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocaleTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconFromUrl(icon),
    speed,
    timezone,
  };
};

const getFormattedWeatherData = async (searchParams) => {
  const currentWeather = await getWeatherData("weather", searchParams);
  const forecastWeather = await getWeatherData("forecast", searchParams);

  const formattedCurrentWeather = formatCurrent(currentWeather);
  const hourly = forecastWeather.list.slice(0, 5).map((item) => ({
    title: formatToLocaleTime(item.dt, currentWeather.timezone, "hh:mm a"),
    temp: item.main.temp,
    icon: iconFromUrl(item.weather[0].icon),
  }));

  const daily = forecastWeather.list
    .filter((_, idx) => idx % 8 === 0) // Pick one forecast per day
    .map((item) => ({
      title: formatToLocaleTime(item.dt, currentWeather.timezone, "ccc"),
      temp: item.main.temp,
      icon: iconFromUrl(item.weather[0].icon),
    }));

  return { ...formattedCurrentWeather, hourly, daily };
};

export default getFormattedWeatherData;
