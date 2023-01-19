import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Clock from './features/Clock';
import Forecast from './features/Forecast';
import { todoUsers, forecastAPI } from './const';
import TodoList from './features/TodoList/TodoList';
import './App.scss';

export default function App() {
  const todoTasks = todoUsers.map((user): JSX.Element => {
    return <TodoList key={user.project_id} {...user} />;
  });

  return (
    <div className="App">
      <div className="App__row App__row--top">
        <div className="App__row__column">
          <Forecast api={forecastAPI} />
        </div>
        <div className="App__row__column App__row__column--right">
          <Clock />
          {/* <TrainTimes /> */}
        </div>
      </div>
      <div className="App__row App__row--bottom">
        <div className="App__row">
          {/* <Birthdays /> */}
          Birthdays
        </div>
        <div className="App__row">{todoTasks}</div>
      </div>
    </div>
  );
}
