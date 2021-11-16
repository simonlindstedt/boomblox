export const variants = {
  hidden: {
    y: '-100%',
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const buttonContainerVariants = {
  active: {
    bottom: '25%',
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    bottom: '89%',
    transition: {
      duration: 0.5,
    },
  },
};

export const buttonVariants = {
  active: {
    backgroundColor: '#7F63B7',
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    backgroundColor: '#000',
    fontSize: '30px',
    transition: {
      duration: 0.5,
    },
  },
};
