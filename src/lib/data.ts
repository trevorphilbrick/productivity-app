import { mockCurrentWeatherData } from "./mockData";

const weatherKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const base_url = "https://productivity-app-six.vercel.app";
export const fetchCurrentWeather = async (
  lat: number,
  long: number,
  useMock: boolean = false
) => {
  if (useMock) {
    console.log("using mock current weather data");
    return mockCurrentWeatherData;
  }

  // convert this to use fetch instead of axios
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${weatherKey}`,
    { method: "GET", cache: "no-store" }
  ).then((response) => {
    return response.json();
  });
  return data;
};

export const fetchTasks = async () => {
  const data = await fetch(`${base_url}/api/get-todos`, {
    method: "GET",
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
  }).then((response) => {
    return response.json();
  });
  return data;
};

export const addTask = async (task: any) => {
  const { title, description, status, priority } = task;

  const data = await fetch(
    `${base_url}/api/add-todo?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(
      description
    )}&status=${encodeURIComponent(status)}&priority=${encodeURIComponent(
      priority
    )}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 0,
      },
    }
  ).then((response) => {
    return response.json();
  });
  return data;
};

export const deleteTask = async (id: number) => {
  const data = await fetch(`${base_url}/api/delete-todo?id=${id}`, {
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
  }).then((response) => {
    return response.json();
  });
  return data;
};
