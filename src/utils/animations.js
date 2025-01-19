export const getRandomDuration = () => 4 + Math.random() * 6;

export const getBoundaries = () => ({
  left: 0,
  right: window.innerWidth - 300,
  top: 0,
  bottom: window.innerHeight - 150
});

export const getInitialPosition = (index, totalCards) => {
  const centerX = window.innerWidth / 2 - 150;
  const centerY = window.innerHeight / 2 - 75;
  const radius = Math.min(window.innerWidth, window.innerHeight) / 4;
  const angle = (index / totalCards) * 2 * Math.PI;
  
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
};

export const getOrganizedAnimation = (index) => ({
  x: 0,
  y: index * 150,
  rotate: [null, -10 + Math.random() * 20, 0],
  scale: [1, 1.2, 1],
  transition: {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 1,
    delay: index * 0.1,
    rotate: {
      duration: 0.5,
      ease: "easeOut"
    },
    scale: {
      duration: 0.5,
      times: [0, 0.6, 1]
    }
  }
});

export const getFloatingAnimation = (startPos, boundaries) => {
  const randomBoolean = Math.random() < 0.5;
  return {
    x: [startPos.x, randomBoolean ? boundaries.right : boundaries.left, randomBoolean ? boundaries.left : boundaries.right],
    y: [startPos.y, randomBoolean ? boundaries.bottom : boundaries.top, randomBoolean ? boundaries.top : boundaries.bottom],
    rotate: 0,
    transition: {
      x: {
        duration: getRandomDuration(),
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      },
      y: {
        duration: getRandomDuration(),
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }
    }
  }
}; 