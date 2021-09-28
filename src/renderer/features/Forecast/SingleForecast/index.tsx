import React from 'react';

import { ForecastSingleType } from '../Forecast.d';
import '../../../assets/css/owfont.min.css';
import './SingleForecast.scss';

const SingleForecast = (props: ForecastSingleType) => {
  const { day, weather, temp, humidity, speed } = props;
  const isToday = day === 0;
  return (
    <div className={`singleForecast singleForecast--${day}`}>
      <i className={`owf owf-${weather?.id}`} />
      <h2 className="singleForecast__temperature">{Math.round(temp.day)}°</h2>
      {isToday ? (
        <p>
          {Math.round(temp.min)}° - {Math.round(temp.max)}°
        </p>
      ) : null}
      {isToday ? <p>humidity {humidity}%</p> : null}
      <p className="singleForecast__description">{weather.description}</p>
      <i className="owf owf-956 wind-icon" />
      <h2 className="singleForecast__speed">
        {Math.floor(speed * 3.6)}
        <span className="singleForecast__speed__unit">km/h</span>
      </h2>
    </div>
  );
};

export default SingleForecast;
