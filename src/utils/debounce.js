export const debounce = (callback, timeDelay = 300) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, timeDelay);
  };
};
