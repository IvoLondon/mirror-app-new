import * as Sentry from '@sentry/react';

const fetchWeatherData = async (api: string) => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast/daily?id=2643743&APPID=${api}&cnt=5&units=metric`
    );

    if (res.ok !== true) {
      throw new Error('Error fetching weather data');
    }

    return await res.json();
  } catch (e) {
    Sentry.captureException(e);
    console.error(`Error with fetchWeatherData! ${e}`);

    return null;
  }
};

export default {
  fetchWeatherData,
};
