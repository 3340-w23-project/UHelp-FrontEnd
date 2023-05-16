export const categoryAnimation = {
  initial: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.25,
      },
      opacity: {
        duration: 0.12,
        delay: 0.05,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.25,
      },
      opacity: {
        duration: 0.12,
      },
    },
  },
};

export const postAnimation = {
  initial: {
    y: -15,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    y: 15,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const menuAnimation = {
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

export const backdropTransition = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
