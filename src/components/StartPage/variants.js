export const variants = {
  hidden: {
    y: '-100%',
    transition: {
      duration: 0.9,
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.9,
    },
  },
};

export const buttonContainerVariants = {
  active: {
    bottom: '25%',
    transition: {
      duration: 0.9,
    },
    zIndex: '9',
  },
  inactive: {
    bottom: '89%',
    transition: {
      duration: 0.9,
    },
    zIndex: '3',
  },
};

export const buttonVariants = {
  active: {
    backgroundColor: '#7F63B7',
    transition: {
      duration: 0.9,
    },
  },
  inactive: {
    backgroundColor: '#000',
    filter: 'none',
    fontSize: '30px',
    transition: {
      duration: 0.9,
    },
  },
};
