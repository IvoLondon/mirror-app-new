import * as React from 'react';

export default (fn: () => void, delay: number) => {
  const savedCallback = React.useRef(() => {});

  React.useEffect(() => {
    savedCallback.current = fn;
  });

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
