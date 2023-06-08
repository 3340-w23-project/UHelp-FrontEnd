export const categoryAnimation = {
  initial: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
  },
  visible: {
    height: "auto",
    overflow: "visible",
    opacity: 1,
    transition: {
      height: {
        duration: 0.35,
      },
      opacity: {
        duration: 0.25,
        delay: 0.1,
      },
      overflow: {
        delay: 0.25,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    overflow: "hidden",
    transition: {
      height: {
        duration: 0.35,
      },
      opacity: {
        delay: 0.1,
        duration: 0.25,
      },
    },
  },
};

export const postAnimation = {
  initial: {
    y: -30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
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

export const fadeTransition = {
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
