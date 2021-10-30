// 當需要用到一堆ifElse時，可以用查表法
const STATUS_WORD = {
  A: "進行中",
  B: "已完成",
  C: "已暫停",
};

const STATUS_COLOR = {
  A: "is-info",
  B: "is-success",
  C: "is-danger",
};

export { STATUS_WORD, STATUS_COLOR };
