export type BirthdaysType = {
  summary: string;
  start: {
    date: string;
  };
};

export type TokenType = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};
