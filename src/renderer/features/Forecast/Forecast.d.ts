export type PropType = {
  api: string;
};

type WeatherType = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type ForecastBase = {
  dt?: number;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  humidity: number;
  speed: number;
  day?: number;
};

export type ForecastType = { weather: Array<WeatherType> } & ForecastBase;
export type ForecastSingleType = { weather: WeatherType } & ForecastBase;
