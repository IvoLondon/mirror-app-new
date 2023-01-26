import * as React from 'react';
import './Birthday.scss';
import { BirthdayType } from './Birthdays.types';

const Birthday = (props: BirthdayType): JSX.Element => {
  return (
    <div className={`Birthday ${props.isToday ? 'Birthday--isToday' : ''}`}>
      <h4 className="Birthday__date">{props.start.date}</h4>
      <h2 className="Birthday__person">{props.summary}</h2>
    </div>
  );
};

export default Birthday;
