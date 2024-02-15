import { mockCurrentWeatherData } from "./mockData";

const weatherKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const base_url = process.env.NEXT_PUBLIC_IS_DEV
  ? "http://localhost:3000"
  : "https://productivity-app-six.vercel.app";

export const fetchCurrentWeather = async (
  lat: number,
  long: number,
  useMock: boolean = false
) => {
  if (useMock) {
    console.log("using mock current weather data");
    return mockCurrentWeatherData;
  }

  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${weatherKey}`,
    { method: "GET", cache: "no-store" }
  ).then((response) => {
    return response.json();
  });
  return data;
};

export const fetchTasks = async (user_id: string) => {
  const data = await fetch(`${base_url}/api/get-todos?userId=${user_id}`, {
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
  const { title, description, status, priority, user_id } = task;

  const data = await fetch(
    `${base_url}/api/add-todo?title=${encodeURIComponent(
      title
    )}&description=${encodeURIComponent(
      description
    )}&status=${encodeURIComponent(status)}&priority=${encodeURIComponent(
      priority
    )}&user_id=${encodeURIComponent(user_id)}`,
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

export const updateStatus = async (id: number, status: string) => {
  const data = await fetch(
    `${base_url}/api/update-status?id=${id}&status=${status}`,
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

export const addQuicklink = async (quicklink: any) => {
  const { linkTitle: title, linkUrl, user_id: userId } = quicklink;

  console.log("api call obj", { title, linkUrl, userId });

  const data = await fetch(
    `${base_url}/api/add-link?title=${encodeURIComponent(
      title
    )}&linkUrl=${encodeURIComponent(linkUrl)}&userId=${encodeURIComponent(
      userId
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

export const fetchQuicklinks = async (user_id: string) => {
  console.log(user_id);
  const data = await fetch(`${base_url}/api/get-links?userId=${user_id}`, {
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

export const deleteQuicklink = async (id: number) => {
  const data = await fetch(`${base_url}/api/delete-link?id=${id}`, {
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
  }).then((response) => {
    return response.json();
  });
  return data;
};
