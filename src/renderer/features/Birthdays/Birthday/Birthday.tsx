import * as React from 'react';
import './Birthday.scss';
import { BirthdayType } from './Birthday.d';

const Birthday = ({ isToday, start, summary }: BirthdayType) => {
  return (
    <div className={`Birthday ${isToday ? 'Birthday--isToday' : ''}`}>
      <h4 className="Birthday__date">{start.date}</h4>
      <h2 className="Birthday__person">{summary}</h2>
    </div>
  );
};

export default Birthday;
