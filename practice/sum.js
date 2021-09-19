console.log("Hello world!");

function sum(param) {
  let ans = 0;
  for (let i = 1; i <= param; i++) {
    ans += i;
  }
  console.log(ans);
}

sum(100);
