export const fetchTodos = async (api: string, project_id: number) => {
  try {
    const res = await fetch(
      `https://api.todoist.com/rest/v1/tasks${
        project_id ? `?project_id=${project_id}` : ''
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${api}`,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error('Error fetching todos');
    }

    return await res.json();
  } catch (e) {
    throw new Error('Error with fetchTodos');
  }
};

export const fetchWeatherData = async (api: string) => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?id=2643743&APPID=${api}&cnt=5&units=metric`
    );

    if (res.status !== 200) {
      throw new Error('Error fetching weather data');
    }

    return await res.json();
  } catch (e) {
    throw new Error('Error with fetchWeatherData');
  }
};
