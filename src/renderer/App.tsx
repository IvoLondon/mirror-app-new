import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Clock from './features/Clock/Clock';
import './App.scss';

const InitialScreen = () => {
  // const todoTasks = todoUsers.map((user): JSX.Element => {
  //   return <TodoList {...user} />;
  // });

  return (
    <div className="App">
      <div className="App__row App__row--top">
        <div className="App__row__column">
          {/* <Forecast /> */}
          Forecars
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
        <div className="App__row">{/* todoTasks */}todo tasks</div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={InitialScreen} />
      </Switch>
    </Router>
  );
}
