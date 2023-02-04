import { printConsoleLog } from '@utils/utilities';

const getAccessToken = async () => {
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
    params.append('redirect_uri', process.env.GOOGLE_REDIRECT_URL as string);
    params.append('grant_type', 'authorization_code');
  }

  params.append('client_id', process.env.GOOGLE_CLIENT_ID as string);
  params.append('client_secret', process.env.GOOGLE_SECRET_ID as string);

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

const fetchCalendar = async (): Promise<any[]> => {
  let token;
  if (window.localStorage.getItem('googleAuth')) {
    token = await getAccessToken();
  } else {
    printConsoleLog('Missing Google Auth Token');
    return [];
  }

  if (!token) {
    printConsoleLog('Missing G-Token');
    return [];
  }

  const calendar = await window!.electron.fetchGoogleCalendar(token);

  if (!calendar?.items?.length) {
    printConsoleLog('No Birthdays');
    console.error(calendar);
    return [];
  }
  printConsoleLog('Birthdays list');
  return calendar.items;
};

export default fetchCalendar;
