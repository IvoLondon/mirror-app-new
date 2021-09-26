/* eslint-disable @typescript-eslint/no-use-before-define */
export const printConsoleLog = (feature: string): void => {
  return console.log(`${new Date().toLocaleString('en-GB')} - ${feature}`);
};

export const timeInMinutes = (mins: number): number => {
  return mins * 1000 * 60;
};

const defaultOffCallback = () => {
  console.log('Feature is switched off');
};

const switchIsOn = (e: () => void) => {
  return e();
};
const switchIsOff = (
  on: number,
  off: number,
  exec: () => void,
  offCallback: () => void,
  i: number
) => {
  setTimeOn(on, off, exec, offCallback, i);
};

export const setTimeOn = (
  switchOn = 6,
  switchOff = 9,
  execution: () => void,
  offCallback = defaultOffCallback,
  interval = 60000
): void => {
  const now = new Date().getHours();
  let onIntervals;
  let offIntervals;
  if (now >= switchOn && now < switchOff) {
    switchIsOn(execution);
    clearTimeout(offIntervals);
    clearTimeout(onIntervals);
    onIntervals = setTimeout(() => {
      setTimeOn(switchOn, switchOff, execution, offCallback, interval);
    }, interval);
  } else {
    clearTimeout(onIntervals);
    offCallback();
    offIntervals = setTimeout(() => {
      switchIsOff(switchOn, switchOff, execution, offCallback, interval);
    }, 15000 * 60);
  }
};
