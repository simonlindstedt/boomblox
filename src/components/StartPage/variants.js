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
    bottom: '15%',
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
    backgroundColor: '#5000ff',
    transition: {
      duration: 0.5,
    },
  },
  inactive: {
    backgroundColor: '#000',
    transition: {
      duration: 0.5,
    },
  },
};
