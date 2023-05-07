import axios from "axios";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./endpoints";

export const getCurrentWeather = async (lat: string, lon: string) => {
  const response = await axios.get(`${WEATHER_API_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

export const getForecast = async (lat: string, lon: string) => {
  const response = await axios.get(`${WEATHER_API_URL}/forecast`, {
    params: {
      lat,
      lon,
      appid: WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};
