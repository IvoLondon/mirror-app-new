import * as React from 'react';
import { setTimeOn } from '@utils/utilities';

import Birthday from './Birthday';
import giftIcon from './assets/giftIcon.png';
import fetchCalendar from './utils/fetchCalendar';
import { BirthdaysType } from './Birthdays.types';

import './Birthdays.scss';

const Birthdays = () => {
  const [birthdays, setBirthdays] = React.useState<any[]>([]);

  const updateCalendar = async () => {
    const calendar = await fetchCalendar();
    setBirthdays(calendar);
  };

  React.useEffect(() => {
    if (!window.localStorage.getItem('googleAuth')) {
      // @ts-ignore-next-line
      window.electron.googleAuth();
      // re-fetch in 2 minute
      setTimeOn(6, 20, updateCalendar, undefined, 1000 * 120);
    } else {
      updateCalendar();
      // re-fetch in 12 hours // 86400 * 1000 for a day
      setTimeOn(6, 20, updateCalendar, undefined, 43200 * 1000);
    }
  }, []);

  const getBirthdayList = (items: BirthdaysType[]): any[] => {
    const todayDate = new Date();
    return items.map((birthdayInfo) => {
      if (typeof birthdayInfo.start === 'undefined') return null;

      const bdate = new Date(birthdayInfo.start.date);

      const diffInTime = bdate.getTime() - todayDate.getTime();
      const isToday =
        todayDate.getDate() === bdate.getDate() &&
        todayDate.getMonth() === bdate.getMonth();
      if (Math.floor(diffInTime / (1000 * 3600 * 24)) > 30) return null;

      return (
        <li key={birthdayInfo.summary + birthdayInfo.start.date}>
          <Birthday isToday={isToday} {...birthdayInfo} />
        </li>
      );
    });
  };

  return (
    <div className="Birthdays">
      <h2 className="Birthdays__title">
        <img src={giftIcon} alt="cake icon" /> Birthdays
      </h2>
      <ul className="Birthdays__list">{getBirthdayList(birthdays)}</ul>
    </div>
  );
};

export default Birthdays;
