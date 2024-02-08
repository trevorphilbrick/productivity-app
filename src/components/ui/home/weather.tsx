"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { fetchCurrentWeather } from "@/lib/data";
import Image from "next/image";

export interface CurrentWeatherTypes {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

function Weather() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [weather, setWeather] = useState<CurrentWeatherTypes | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (position.latitude && position.longitude) {
      fetchCurrentWeather(position.latitude, position.longitude, true).then(
        (data) => {
          setWeather(data);
        }
      );
    }
  }, [position]);

  return (
    <Card className="md:w-64">
      <h1 className="text-center my-4 font-semibold text-lg">Weather</h1>
      <div className="flex items-center border mx-3 mb-2 rounded-md px-1 py-2">
        <div className="mr-3">
          {weather?.weather[0].icon && (
            <Image
              src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
              alt="weather icon"
              width={36}
              height={36}
            />
          )}
        </div>
        <div>
          <p>
            current: <span className="text-sm">{weather?.main.temp}°F</span>
          </p>
          <p className="text-sm">
            hi: <span className="text-xs">{weather?.main.temp_max}</span> lo:{" "}
            <span className="text-xs">{weather?.main.temp_min}</span>
          </p>
          <p className="text-sm text-slate-600">
            {weather?.weather[0].description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Weather;
