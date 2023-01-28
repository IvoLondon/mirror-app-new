import * as React from 'react';
// import * as electron from 'electron';
import Birthday from './Birthday';
import './Birthdays.scss';
import cakeIcon from './assets/birthday-cake.png';
import { setTimeOn, printConsoleLog } from './../../utilities/utilities';
import { BirthdaysType, TokenType } from './Birthdays.types';

const Birthdays = (): JSX.Element => {
  const [birthdays, setBirthdays] = React.useState([]);

  let accessTokenObject: Token;

  React.useEffect(() => {
    if (!window.localStorage.getItem('googleToken')) {
      window.electron.googleAuth();
      //setTimeOn(6, 20, fetchCalendar, 43200 * 1000); //86400 * 1000 for a day
    }
    // accessTokenObject = electron.remote.getGlobal('googleToken');
    // fetchCalendar();
    // setInterval(fetchCalendar, 3600 * 1000); //7200
    //setTimeOn(6, 20, fetchCalendar, 43200 * 1000); //86400 * 1000 for a day
  }, []);

  const fetchCalendar = async () => {
    const requestToken = await getAuthToken(accessTokenObject);
    if (!requestToken) {
      printConsoleLog('Missing G-Token');
      setBirthdays([]);
      return;
    }

    const queries = `?alwaysIncludeEmail=false&orderBy=startTime&maxResults=10&singleEvents=true&timeMin=${new Date().toISOString()}`;
    const calendar = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/cq21prk1rdn1uvltf5fntbvl74@group.calendar.google.com/events${queries}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer "${requestToken}"`, //the token is a variable which holds the token
          Accepts: 'application/json',
        },
      }
    );
    if (calendar.status === 200) {
      printConsoleLog('Birthdays list');
      if (calendar.data.items.length) {
        setBirthdays(calendar.data.items);
      }
    }
  };

  const getAuthToken = async (token: any): Promise<string> => {
    if (typeof token != 'object' && !token.access_token) return '';

    const requestNewToken = await fetch('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: token.refresh_token,
      grant_type: 'refresh_token',
    });
    return requestNewToken.data.access_token;
  };

  const getBirthdayList = (birthdays: Birthdays[]) => {
    const todayDate = new Date();
    return birthdays.map((birthdayInfo) => {
      if (typeof birthdayInfo.start == 'undefined') return;
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
        <img src={cakeIcon} alt="cake icon" /> Birthdays
      </h2>
      <ul className="Birthdays__list">{getBirthdayList(birthdays)}</ul>
    </div>
  );
};

export default Birthdays;
