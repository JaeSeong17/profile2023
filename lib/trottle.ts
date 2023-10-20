export default function throttle(
  callback: (this: HTMLElement, event: Event) => void,
  delay: number
) {
  let lastExecuted = 0;
  return function (this: HTMLElement, ...args: [event: Event]) {
    const now = Date.now();
    if (now - lastExecuted >= delay) {
      callback.apply(this, args);
      lastExecuted = now;
    }
  };
}
