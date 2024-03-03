import { mockCurrentWeatherData } from "./mockData";

const base_url = process.env.NEXT_PUBLIC_IS_DEV
  ? "http://localhost:3000"
  : "https://productivity-app-six.vercel.app";

// #region weather
const weatherKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchCurrentWeather = async (
  lat: number,
  long: number,
  useMock: boolean = false
) => {
  if (useMock) {
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
// #endregion
// #region tasks

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
// #endregion
// #region quicklinks
export const addQuicklink = async (quicklink: any) => {
  const { linkTitle: title, linkUrl, user_id: userId } = quicklink;

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
// #endregion
//#region notes

export const addNote = async (
  noteTitle: string,
  noteBody: string,
  user_id: string
) => {
  const bodyData = {
    noteBody,
  };
  const data = await fetch(
    `${base_url}/api/add-note?noteTitle=${encodeURIComponent(
      noteTitle
    )}&user_id=${user_id}`,
    { method: "POST", body: JSON.stringify(bodyData) }
  );

  return data;
};

export const updateNote = async (
  noteTitle: string,
  noteBody: string,
  id: number
) => {
  const bodyData = {
    noteTitle,
    noteBody,
  };

  const data = await fetch(`${base_url}/api/update-note?id=${id}`, {
    method: "POST",
    body: JSON.stringify(bodyData),
  });

  return data;
};

export const fetchNotes = async (user_id: string) => {
  const data = await fetch(`${base_url}/api/get-notes?userId=${user_id}`, {
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

export const fetchNote = async (user_id: string, id: number) => {
  const data = await fetch(
    `${base_url}/api/get-note?userId=${user_id}&id=${id}`,
    {
      method: "GET",
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

export const deleteNote = async (id: number) => {
  const data = await fetch(`${base_url}/api/delete-note?id=${id}`, {
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
  }).then((response) => {
    return response.json();
  });
  return data;
};

//#endregion
//#region user
export const addUser = async (user: any) => {
  const { username, email, password } = user;

  const data = await fetch(`${base_url}/api/add-user`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
  }).then((response) => {
    return response.json();
  });

  return data;
};

export const fetchUser = async (username: string, password: string) => {
  const data = await fetch(`${base_url}/api/sign-in`, {
    method: "POST",
    cache: "no-cache",
    next: {
      revalidate: 0,
    },
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    return response.json();
  });
  // set token in local storage
  localStorage.setItem("session", JSON.stringify(data));

  return data;
};

//#endregion
