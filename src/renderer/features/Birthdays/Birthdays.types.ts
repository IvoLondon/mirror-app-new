export type BirthdaysType = {
  summary: string;
  start: {
    date: string;
  };
};

export type TokenType = {
  expiry_date: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
};
