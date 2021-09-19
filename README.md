# node 練習專案

---

# 任務一

> 新增一等差級數相加的 funtion
>
> > - 嘿嘿嘿

# 任務二

---

# 任務三

---
# REPL (read, evaluate, print, loop)

直接在終端機內開啟  node.js去編輯（較少使用）

---

# Module

*註解：就是很多個有功能性的 JS Files 整合在一起的 File，這些功能是可以被自己或是他人重複利用的。*

## Module Wrapper(包裝)

*註解：當VScode編輯完成的程式碼，使用 **Node.js** 來跑時， 在codes的外層會自動被加上一個function(), 目的是使執行的**程式碼的scope改成module scope** ，只有在當前的module function內才有意義*

!! 只有在node.js內 exports, require, module, __filename, __dirname 才有效，在網頁內跑他會顯示 not defined

```jsx
// 範例
(function(exports, require, module, __filename, __dirname) {
	sayHi("Ian");

  function sayHi(name) {
		console.log(name + " Says Hi~")
	}  

})
```

## __filename, __dirname

*註解：一個是顯示當前檔案位置，一個則是當前檔案的母資料夾的位置*

```jsx
// 範例：假設目前在桌面上的JS資料夾，檔案名稱為app.js
console.log(__filename)
/Users/ianian880116/Desktop/JS/app.js

console.log(__dirname)
/Users/ianian880116/Desktop/JS

```

---

## 製作自己的Module

*小知識：通常在定一個module時都會用const, 因為通常不會再去改變它*

## exports, require

*註解：將做好的功能丟出 及拿來用的方法*

```jsx
// 在每個步驟告一段落時，可以console.log(module) 來看有什麼變化（注意：export, parent, children）

// try1.js File
function morning(name) {
  console.log("Good morning " + name);
}

function sayHi(name) {
  console.log("Hi! I'm " + name);
}

module.exports.morning = morning;
module.exports.sayHi = sayHi;
//  設定兩function並且exports出去
// console.log(module)看看
// module因為太常用了，在輸入時可以省略

// app.js File
const try1 = require("./try1")  // 先連結try1即可使用他的所有功能

try1.morning("Ian")
// 將著在終端機執行後就會顯示
// Good morning Ian

```

情況二（真實使用方式）

*簡單來說就是：同類 js文件放入一文件夾內，在此文件夾內新增一 **index.js**文件，接著將所有其他文件的功能都exports到 index.js內後，**再由 index.js統一去exports***

```jsx
// 正常會將同類的Module File放在一個dir內
// 假設目前 greeting dir內裝著 try1, try2 
// 首先 先在greeting內 新建一個**index.js** File
// **index.js 內**
const try1 = require("./try1");   // 先得到try1, try2的exports
const try2 = require("./try2");

exports.morning = try1.morning;  // 再將得到的東西exports出去
exports.sayHi = try1.sayHi;
exports.night = try2.night;

// **app.js 內**
const greeting = require("./greeting")  // 這裡的greeting指的是整個dir 但只會return index.js的內容
console.log(greeting)
//  如有顯示三個function則表示成功
```

---

## Build-in Modules （內建的modules)

*註解：要使用module時，都需要先require*

### path

```jsx
const path = require("path");

// 1 **join()**,  功能：把兩個path相加，**等於是更改路徑**
console.log(path.join(__dirname, "try1.js"));  
// /Users/ianian880116/Desktop/JavaScript練習/try1.js
// 也可以這樣用
let x = path.join(__dirname, __filename)

// 2  **extname()** 功能：顯示當前文件的類型
console.log(path.extname(__filename));
// .js

// 3 **basename()** 功能：顯示當前文件(or文件夾文件夾)全名
console.log(path.basename(__filename));
// app.js
```

## url

```jsx
const url = require("url");

const formURL =
  "http://120.7.0.4:5201/Users/ianian880116/Desktop/IanProjects/portfolio%20project/contact.html?name=IAN&email=ian%40gmial.com&phone=0988888888&need=no/Desktop/IanProjects/portfolio%20project/index.html";
const parsedURL = url.parse(formURL, true);

// 1 host
console.log(parsedURL.host)
// 120.7.0.4:5201      5201為PORT)

// 2 hostname
console.log(parsedURL.hostname)
// 120.7.0.4

// 3 path  功能：顯示當前檔案的路徑
console.log(parsedURL.path)
// /Users/ianian880116/Desktop/IanProjects/portfolio%20project/contact.html?name=IAN&email=ian%40gmial.com&phone=0988888888&need=no/Desktop/IanProjects/portfolio%20project/index.html

// 4 pathname 功能：顯示當前檔案的名稱
console.log(parsedURL.pathname)
// /Users/ianian880116/Desktop/IanProjects/portfolio%20project/contact.html

// 5 query 功能：通常用在取得表單輸入的資料
console.log(parsedURL.query);
// [Object: null prototype] {
//  name: 'IAN',
//  email: 'ian@gmial.com',
//  phone: '0988888888',
//  need: 'no/Desktop/IanProjects/portfolio project/index.html'
// }

console.log(parsedURL.query.email);
// ian@gmial.com

```

## fs (file system)

*用途：在  JS **製作文件***

範例：*使用者在使用網路時發生 bug( error )時，可以將其記錄下來給開發者修正*

```jsx
// writeFile() 功能：增加一文件檔
// 假設我們要用writeFile新增一文字檔案，若是失敗的話return e
const fs = require("fs");
// ("File name", "text something", 任何一種func，通常會用匿名arrow) e指的是error
fs.writeFile("try.txt", "Tody is a good day.", (e) => {
  if (e) throw e;                      // if 下面的console是 else (ifStatement的簡寫)

  console.log("File is been written.");
});

// readFile 功能：閱讀某文件檔
// ("放文件路徑", "utf-8", (e指errow, data指的是文件內的資料) => {})
fs.readFile("./try.txt", "utf-8", (e, data) => {
  if (e) throw e;

  console.log(data);
}); 

// 以上 假設不小心手誤打錯，就會通知開發者有errow
```

---

# IP

**註解：**只要任意裝置連接網路，就會產生一個IP位置

v4是舊版， v6則是目前最新版

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1f15929-ffae-42c3-8412-adee2064cab5/_2021-06-09_9.01.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1f15929-ffae-42c3-8412-adee2064cab5/_2021-06-09_9.01.38.png)

# DNS (Domain Name System)

**註解：**將人腦理解的語言轉換為電腦理解的語言之工具

輸入網址後，會自動將文字變成二進位的數字型態

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe4cfdff-8ae8-465d-936b-2dcf4921dc0a/_2021-06-09_9.06.00.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe4cfdff-8ae8-465d-936b-2dcf4921dc0a/_2021-06-09_9.06.00.png)

# PORT (接口，連接阜)

**註解：**IP位置後面的一數字就是port, 負責處理各種不同資料，一組對應一種功能。

ex.    80 ⇒ HTTP,   20 ⇒ FTP,   53 ⇒ DNS,  443 ⇒ HTTPs

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/991202e5-4d1b-4a64-8553-153e6afd03eb/_2021-06-09_9.12.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/991202e5-4d1b-4a64-8553-153e6afd03eb/_2021-06-09_9.12.13.png)

---

# Node Server (伺服器)

小知識：node app.js可以使伺服器開始運作，control+c可停止。

### 建構一個port為3501的伺服器

```jsx
const http = require("http");

const server = http.createServer((req, res) => {     //(request, respond)
  console.log(req.url);      // (顯示當前網址的意思)

  res.write("Hellow user.");
  res.end();
});

server.listen(3501, () => {
  console.log("Server is running on port 3501.");
});
```

### 如網址為 / (未輸入任何文字)顯示 homepage，若是在網址後面輸入東西則顯示Hello ...

```jsx
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("You are on the Homepage .");
    res.end();
  } else {
    let parsedURL = url.parse(req.url);
    res.write("Hello " + parsedURL.pathname);
    res.end();
  }
});

server.listen(3501, () => {
  console.log("Server is running on port 3501.");
});
```

### 在res.write輸入html的code

```jsx
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
res.writeHead(200, { "content-Type": "text/html" }); // 這句是為了讓html能在這運行
  if (req.url == "/") {
    
		res.write("<h1>You are on the Homepage .</h1>");
    res.write(
      "<p>Lorem ipsum dolor sit amet consectetur dolorum eos delectus maxime eaque at quo!</p>"
    );
    res.end();
  } else {
    let parsedURL = url.parse(req.url);
    res.write("Hellow " + parsedURL.pathname);
    res.end();
  }
});

server.listen(3501, () => {
  console.log("Server is running on port 3501.");
});
```

### 使伺服器連結   到index.html 並顯示其內容

```jsx
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-Type": "text/html" });
  if (req.url == "/") {
    // readFile的路徑是指 當前檔案所在的資料夾位置再 + index.html, 故 imdex.html檔案的位置必須和app.js一樣。
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        throw err;
      } else {
      // 將index.html的data全部寫入3501這個伺服器
        res.write(data);
        res.end();
      }
    });
  } else {
    let parsedURL = url.parse(req.url);
    res.write("Hellow " + parsedURL.pathname);
    res.end();
  }
});

server.listen(3501, () => {
  console.log("Server is running on port 3501.");
});
```

---

# Npm (Node package manager)

*註解：幫助開發者管理下載下來的眾多 Modules~*

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e0168f0-70ed-4acc-8bb7-6f4f845ce192/_2021-06-10_4.43.09.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e0168f0-70ed-4acc-8bb7-6f4f845ce192/_2021-06-10_4.43.09.png)

## 如何使用別人的Modules

用有名的cowsay來當示範

```jsx
// 前置作業
在終端機 移動至要使用npm的dir後，輸入 npm init
接著確認檔案名稱 => enter => npm version => enter => .......
依序輸入至作者後 當前的dir內就會多出一package.json的檔案後 即可

// 正式開始取得npm
接著去 https://www.npmjs.com/package/cowsay 
將網站提供的下載方codes： npm i cowsay 複製入終端機內 

此時會發現dir內出現幾個其他資料夾，
!! 並且 packade.json 內的 dependencies 就會出現 "cowsay": "^1.5.0" 這樣就完成了

// 使用npm
// 在vscode輸入 
var cowsay = require("cowsay");

console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));

再用終端機打開即可 （node app.js）

```

## 補充： nodemon

是一個npm, 功能是使開發者在app.js改變一些code時，不需要到終端機先停止server運行，再啟動

可以直接運行新增加或減少的code
