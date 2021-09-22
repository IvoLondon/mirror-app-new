import React, { useEffect, useState } from 'react';
import { getWeekday, getMonth } from '../../utilities/humanitiesClock';

import './Clock.scss';

const Clock = (): JSX.Element => {
  const [time, getTime] = useState(new Date());
  let h = 0;
  let m = 0;
  let wd = '';
  let md = 0;
  let mm = '';
  useEffect(() => {
    setInterval(() => {
      getTime(new Date());
    }, 1000);
  }, []);

  if (time) {
    h = time.getHours();
    m = time.getMinutes();
    wd = getWeekday(time.getDay());
    md = time.getDate();
    mm = getMonth(time.getMonth());
  }

  return (
    <div className="Clock">
      <h4>
        {h}:{m < 10 ? `0${m}` : m}
      </h4>
      <p>
        {wd} {md} {mm}
      </p>
    </div>
  );
};

export default Clock;
