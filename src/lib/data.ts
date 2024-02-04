import axios from "axios";
import { mockCurrentWeatherData } from "./mockData";

const weatherKey = "0a9a7d8f966513e6cfe48f5a1240b915";

export const fetchCurrentWeather = async (
  lat: number,
  long: number,
  useMock: boolean = false
) => {
  if (useMock) {
    console.log("using mock current weather data");
    return mockCurrentWeatherData;
  }
  const data = await axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${weatherKey}`,
  }).then((response) => {
    return response.data;
  });
  return data;
};
