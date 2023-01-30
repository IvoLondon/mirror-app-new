import * as React from 'react';
// import * as electron from 'electron';
import Birthday from './Birthday';
import './Birthdays.scss';
import cakeIcon from './assets/birthday-cake.png';
import { setTimeOn, printConsoleLog } from './../../utilities/utilities';
import { BirthdaysType, TokenType } from './Birthdays.types';

const Birthdays = (): JSX.Element => {
  const [birthdays, setBirthdays] = React.useState([]);

  React.useEffect(() => {
    if (!window.localStorage.getItem('googleAuth')) {
      // @ts-ignore-next-line
      window.electron.googleAuth();

      // TODO: rerender component when token is set
      // window.electron.on('googleToken', (event, token) => {
      //   console.log('token', token);
      //   window.localStorage.setItem('googleAuth', token);
      //   fetchCalendar();
      // });
    } else {
      fetchCalendar();
      // setInterval(fetchCalendar, 3600 * 1000); //7200
      //setTimeOn(6, 20, fetchCalendar, 43200 * 1000); //86400 * 1000 for a day
    }

    //setTimeOn(6, 20, fetchCalendar, 43200 * 1000); //86400 * 1000 for a day
    // accessTokenObject = electron.remote.getGlobal('googleToken');
  }, []);

  const fetchCalendar = async () => {
    let token;
    if (window.localStorage.getItem('googleAuth')) {
      token = await getAccessToken();
    } else {
      printConsoleLog('Missing Google Auth Token');
      return;
    }

    if (!token) {
      printConsoleLog('Missing G-Token');
      setBirthdays([]);
      return;
    }

    const calendar = await window.electron.fetchGoogleCalendar(token);

    if (calendar?.items?.length) {
      printConsoleLog('Birthdays list');
      setBirthdays(calendar.items);
    } else {
      printConsoleLog('No Birthdays');
      console.error(calendar);
      setBirthdays([]);
    }
  };

  const getAccessToken = async (): Promise<TokenType | null> => {
    const accessToken = window.localStorage.getItem('googleAuth') as string;
    const googleAccessToken = window.localStorage.getItem('googleAccessToken')
      ? JSON.parse(window.localStorage.getItem('googleAccessToken') as string)
      : null;

    const params = new URLSearchParams();

    if (googleAccessToken && googleAccessToken.refresh_token) {
      params.append('refresh_token', googleAccessToken.refresh_token);
      params.append('grant_type', 'refresh_token');
    } else {
      params.append('code', decodeURIComponent(accessToken));
      params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URL);
      params.append('grant_type', 'authorization_code');
    }

    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_SECRET_ID);

    const tokenEndpoint = `https://oauth2.googleapis.com/token?${params.toString()}`;

    const requestNewToken = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    let res = await requestNewToken.json();

    if (googleAccessToken) {
      res = {
        ...googleAccessToken,
        ...res,
      };
    }
    window.localStorage.setItem('googleAccessToken', JSON.stringify(res));

    return res;
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
