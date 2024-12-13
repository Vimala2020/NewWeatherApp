import { DateTime } from "luxon";

const API_KEY = "30527a5348da6170bea55ba7e52edb00";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`API Error:`, errorData);
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
) =>{
  // Adjust time by adding the timezone offset
  return DateTime.fromSeconds(secs, { zone: "utc" })
    .plus({ seconds: offset })
    .toFormat(format);
};

const iconFromUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatCurrent = (data) => {
    if (!data || !data.coord) {
        throw new Error("Invalid weather data response");
      }

  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

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
    .filter((_, idx) => idx % 8 === 0) // Approx 8 data points per day
    .map((item) => ({
      title: formatToLocaleTime(item.dt, currentWeather.timezone, "ccc"),
      temp: item.main.temp,
      icon: iconFromUrl(item.weather[0].icon),
    }));

  return { ...formattedCurrentWeather, hourly, daily };
};

export default getFormattedWeatherData;