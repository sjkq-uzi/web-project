//防抖
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    //清除定时器
    if (timer) {
      console.log("timer=");
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
    console.log("time=", timer);
  };
};
