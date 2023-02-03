import React, { useEffect, useState } from 'react';

import './Clock.scss';

const Clock = () => {
  const [time, getTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      getTime(new Date());
    }, 1000);
  }, []);

  if (!time) return <div className="Clock" />;
  return (
    <div className="Clock">
      <h4>
        {time.toLocaleTimeString('en-UK', {
          hour: 'numeric',
          minute: '2-digit',
        })}
      </h4>
      <p>
        {time.toLocaleDateString('en-UK', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })}
      </p>
    </div>
  );
};

export default Clock;
