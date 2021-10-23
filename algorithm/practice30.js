//printMany();
function printMany() {
  for (let i = 0; i < 101; i++) {
    console.log(i);
  }
}

//printEvery3();
function printEvery3() {
  for (let i = 1; i <= 88; i += 3) {
    console.log(i);
  }
}

// stars(3);
function stars(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "*";
  }
  console.log(result);
}

// console.log(isUpperCase("Accccc"));
function isUpperCase(input) {
  let RegExp = /[A-Z\W]/;
  let result = true;
  let arr = input.split("");
  if (arr.length === 0) {
    result = false;
  }

  if (!RegExp.test(arr[0])) {
    result = false;
  }

  return result;
}

//console.log(isAllUpperCase("AAAAAa"));
function isAllUpperCase(input) {
  let RegExp = /[A-Z\W]/;
  let result = true;
  let arr = input.split("");

  if (arr.length === 0) {
    result = false;
  }
  arr.forEach((e) => {
    if (!RegExp.test(e)) {
      result = false;
    }
  });

  return result;
}

//console.log(position("fdggDdA"));
function position(input) {
  let RegExp = /[A-Z\W]/;
  let result = "";
  let arr = input.split("");

  if (arr.length === 0) {
    result = -1;
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (RegExp.test(arr[i])) {
        result += `${arr[i]}, ${i}`;
        break;
      }
    }
  }

  return result;
}

//console.log(findSmallCount([2, 3, 5, 9, 11], 1));
function findSmallCount(arr, input) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < input) {
      result.push(arr[i]);
    }
  }

  return result.length;
}

//console.log(findSmallerTotal([2, 3, 5, 9, 11], 5));
function findSmallerTotal(arr, input) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < input) {
      result += arr[i];
    }
  }

  return result;
}

//console.log(findAllSmall([2, 3, 5, 9, 11], 8));
function findAllSmall(arr, input) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < input) {
      result.push(arr[i]);
    }
  }

  return result;
}

//console.log(sum());
function sum(...number) {
  let total = 0;
  for (let i = 0; i < number.length; i++) {
    total += number[i];
  }
  return total;
}

//star(5);
function star(n) {
  // n = 行, j = *
  for (let i = 1; i <= n; i++) {
    let string = "";
    for (let j = 1; j <= i; j++) {
      string += "*";
    }
    console.log(string);
  }
}

//console.log(star2(4));
function star2(n) {
  let string = "*";

  if (n === 1) return string;

  for (let i = 2; i <= n; i++) {
    let stars = "\\n";
    for (let j = 1; j <= i; j++) {
      stars += "*";
    }
    string += stars;
  }
  return string;
}

//star3(6);
function star3(n) {
  // n = 行, j = *

  // 上三角
  for (let i = 1; i <= n; i++) {
    let string = "";
    for (let j = 1; j <= i; j++) {
      string += "*";
    }
    console.log(string);
  }

  // 下三角
  for (let i = n - 1; i >= 1; i--) {
    let string = "";
    for (let j = 1; j <= i; j++) {
      string += "*";
    }
    console.log(string);
  }
}

//table(5);
function table(n) {
  for (let i = 1; i < 10; i++) {
    console.log(`${n} * ${i} = ${n * i}`);
  }
}

//table9to9();
function table9to9() {
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      console.log(`${i} * ${j} = ${i * j}`);
    }
  }
}

//console.log(fib(0));
function fib(n) {
  let preNum = 0;
  let currentNum = 1;
  let result = 0;
  let final = 0;
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      final = 1;
    } else {
      result = currentNum + preNum;
      final = result;
      preNum = currentNum;
      currentNum = result;
    }
  }

  return final;
}

//reverse("candy lee.");
function reverse(string) {
  let result = [];
  let strArr = string.split("");
  strArr.forEach((s) => {
    result.unshift(s);
  });
  console.log(result.join(""));
}

//swap("aaBBscdA");
function swap(string) {
  let result = [];
  let strArr = string.split("");
  strArr.forEach((s) => {
    if (s === s.toUpperCase()) {
      result.push(s.toLowerCase());
    } else {
      result.push(s.toUpperCase());
    }
  });

  console.log(result.join(""));
}

//findMin([1, -10, 2, 33, 43, -222]);
function findMin(arr) {
  let min = Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  console.log(min);
}

//console.log(findNthMin([1, -10, 2, 33, 43, -222], 3));
function findNthMin(array, n) {
  function mergeTime(arr1, arr2) {
    let i = 0;
    let j = 0;
    let result = [];

    while (arr1.length > i && arr2.length > j) {
      if (arr1[i] > arr2[j]) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }

    while (arr1.length > i) {
      result.push(arr1[i]);
      i++;
    }
    while (arr2.length > j) {
      result.push(arr2[j]);
      j++;
    }
    return result;
  }

  function mergeSort(arr) {
    let len = arr.length;
    if (len === 1) {
      return arr;
    } else {
      let middle = Math.floor(len / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, len);

      return mergeTime(mergeSort(right), mergeSort(left));
    }
  }

  return mergeSort(array)[n - 1];
}

//console.log(mySort([1, 9, 5, 33, -1, 4, 32]));
function mySort(array) {
  function mergeTime(arr1, arr2) {
    let i = 0;
    let j = 0;
    let result = [];

    while (arr1.length > i && arr2.length > j) {
      if (arr1[i] > arr2[j]) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }

    while (arr1.length > i) {
      result.push(arr1[i]);
      i++;
    }
    while (arr2.length > j) {
      result.push(arr2[j]);
      j++;
    }
    return result;
  }

  function mergeSort(arr) {
    let len = arr.length;
    if (len === 1) {
      return arr;
    } else {
      let middle = Math.floor(len / 2);
      let right = arr.slice(0, middle);
      let left = arr.slice(middle, len);

      return mergeTime(mergeSort(right), mergeSort(left));
    }
  }

  return mergeSort(array);
}

// console.log(isPrime(222));
function isPrime(n) {
  let result = true;
  if (n === 1 || n === 0) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      result = false;
      break;
    }
  }

  return result;
}

//console.log(confirmEnding("Bastian", "ian"));
function confirmEnding(string, string2) {
  let str = string.split("");
  let str2 = string2.split("");
  let str1_test = str.slice(str.length - str2.length, str.length);

  let result = true;
  for (let i = 0; i < str2.length; i++) {
    if (str2[i] !== str1_test[i]) {
      result = false;
    }
  }
  return result;
}

// findDuplicate([1, 5, 4, 3, 1]);
function findDuplicate(arr) {
  let result = false;

  // 計分板
  let counter = {};
  for (let i = 0; i < arr.length; i++) {
    if (counter[arr[i]]) {
      counter[arr[i]]++;
    } else {
      counter[arr[i]] = 1;
    }
  }

  // 假設次 > 1; 則有重複
  for (let j in counter) {
    if (counter[j] > 1) {
      result = true;
    }
  }

  console.log(result);
}

//palindrome("Whatever Revetahw");
function palindrome(string) {
  let str = string.toUpperCase();
  let arr = str.split("");
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, arr.length);
  let rightR = [];

  // reverse the right part
  for (let i = right.length - 1; i >= 0; i--) {
    rightR.push(right[i]);
  }

  // 長度為奇數情況，右邊會多一個字, rightR的最後一字剛好就是center，故直接pop掉
  if (left.length < rightR.length) {
    rightR.pop();
  }

  let result = true;
  for (let i = 0; i < arr.length; i++) {
    if (left[i] !== rightR[i]) {
      result = false;
    }
  }

  console.log(result);
}

//pyramid(5);
function pyramid(n) {
  // i = 每一行; y = " "; j = *
  for (let i = 1; i <= n; i++) {
    let str = "";
    // 空白
    for (let y = i; y < n; y++) {
      str += " ";
    }

    // *
    for (let j = 1; j <= [2 * i] - 1; j++) {
      str += "*";
    }
    console.log(str);
  }
}

//inversePyramid(5);
function inversePyramid(n) {
  // i = 每一行; y = " "; j = *
  for (let i = n; i >= 1; i--) {
    let str = "";
    // 空白
    for (let y = i; y < n; y++) {
      str += " ";
    }

    // *
    for (let j = 1; j <= [2 * i] - 1; j++) {
      str += "*";
    }
    console.log(str);
  }
}

//lozenge(5);
function lozenge(n) {
  // i = 每一行; y = " "; j = *
  // 上半部
  for (let i = 1; i <= n; i++) {
    let str = "";
    // 空白
    for (let y = i; y < n; y++) {
      str += " ";
    }

    // *
    for (let j = 1; j <= [2 * i] - 1; j++) {
      str += "*";
    }
    console.log(str);
  }

  // 下半部
  for (let i = n - 1; i >= 1; i--) {
    let str = "";
    // 空白
    for (let y = i; y < n; y++) {
      str += " ";
    }

    // *
    for (let j = 1; j <= [2 * i] - 1; j++) {
      str += "*";
    }
    console.log(str);
  }
}

// 28
//factorPrime(199);
function factorPrime(n) {
  let answer = n + " = ";
  let p = 2;

  while (p <= n) {
    if (n % p === 0) {
      answer += p + " x ";
      n /= p;
    } else {
      p++;
    }
  }

  answer = answer.substring(0, answer.length - 3);
  console.log(answer);
}

// 29
//intersection([1, 3, 4, 6, 10], [5, 11, 4, 3, 100, 144, 0, 6]);
function intersection(arr1, arr2) {
  let arr = arr1.concat(arr2);
  let counter = {};

  // 計分板，有重複就 ++, 沒有出現過則 = 1;
  for (let i = 0; i < arr.length; i++) {
    if (counter[arr[i]]) {
      counter[arr[i]]++;
    } else {
      counter[arr[i]] = 1;
    }
  }

  // 重複過的push into arr
  let result = [];
  for (let n in counter) {
    if (counter[n] > 1) {
      result.push(n);
    }
  }

  console.log(result);
}

//30
flatten([1, [[], 2, [0, [1]], [3]], [1, 3, [3], [4, [1]], [2]]]);
function flatten(arr) {
  let result = [];

  helper(arr);
  function helper(arr1) {
    for (let i = 0; i < arr1.length; i++) {
      if (Array.isArray(arr1[i])) {
        helper(arr1[i]);
      } else {
        result.push(arr1[i]);
      }
    }
  }

  console.log(result);
}
