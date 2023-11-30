// Simple closure to make a throttle function which wont rune again for some delay (if repeatedly called)
export const throttle = (func: () => void, delay = 1000) => {
  let inProgress = false;

  return () => {
    if (inProgress) {
      return;
    }

    inProgress = true;

    setTimeout(() => {
      func();
      inProgress = false;
    }, delay);
  };
}
