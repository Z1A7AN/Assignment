import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiAnimation = ({ duration = 40000 }) => {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;
  return <Confetti width={width} height={height} />;
};

export default ConfettiAnimation;
