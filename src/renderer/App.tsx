import React from 'react';
import Feature from './features';
import { forecastAPI } from './const';
import './App.scss';

export default function App() {
  return (
    <div className="App">
      <div className="App__row App__row--top">
        <div className="App__row__column">
          <Feature.Forecast api={forecastAPI} />
        </div>
        <div className="App__row__column App__row__column--right">
          <Feature.Clock />
          {/* <TrainTimes /> */}
        </div>
      </div>
      <div className="App__row App__row--bottom">
        <div className="App__row">
          <Feature.Birthdays />
        </div>
        <div className="App__row">{Feature.TodoList()}</div>
      </div>
    </div>
  );
}
