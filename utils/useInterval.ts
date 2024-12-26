import { useEffect, useRef } from 'react';

interface IUseInterval {
  (callBack: () => void, delay: number): void;
}

const useInterval: IUseInterval = (callBack, delay) => {
  const savedCallBack = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallBack.current = callBack;
  }, [callBack]);

  useEffect(() => {
    function tick() {
      if (savedCallBack.current) {
        savedCallBack.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
