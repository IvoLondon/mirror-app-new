import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData } from '../../utilities/apiRequest';
import { timeInMinutes, printConsoleLog } from '../../utilities/utilities';
import useInterval from '../../utilities/customHooks';
import SingleForecast from './SingleForecast';

import { ForecastType, PropType } from './Forecast.d';
import './Forecast.scss';

const Forecast = ({ api }: PropType) => {
  const [forecastList, getForecast] = useState<ForecastType[]>([]);

  const handleAPI = useCallback(async () => {
    const res = await fetchWeatherData(api);
    if (res?.list?.length) {
      getForecast(res.list);
    }
    printConsoleLog('Forecast');
  }, [api]);

  useEffect(() => {
    handleAPI();
  }, [handleAPI]);

  useInterval(handleAPI, timeInMinutes(15));

  let dailyForecast = null;
  if (forecastList.length) {
    dailyForecast = forecastList.map((day, idx) => {
      return (
        <li key={day.dt}>
          <SingleForecast
            day={idx}
            humidity={day.humidity}
            weather={day.weather[0]}
            temp={day.temp}
            speed={day.speed}
          />
        </li>
      );
    });
  }

  return (
    <>
      <ul className="Forecast">{dailyForecast}</ul>
    </>
  );
};

export default Forecast;
