import { useState } from 'react';
import { getInitialPosition, getBoundaries, getOrganizedAnimation, getFloatingAnimation } from '../utils/animations';

export const useCardAnimation = (index, totalCards) => {
  const [isOrganized, setIsOrganized] = useState(false);
  const boundaries = getBoundaries();
  const startPos = getInitialPosition(index, totalCards);

  const getAnimation = () => {
    return isOrganized
      ? getOrganizedAnimation(index)
      : getFloatingAnimation(startPos, boundaries);
  };

  return {
    isOrganized,
    setIsOrganized,
    startPos,
    getAnimation
  };
}; 