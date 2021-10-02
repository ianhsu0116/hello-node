# QUIZ

## 問題一

> 題目：
>
> ```
> function readData(idx) {
>  for (let i = 0; i < 100; i++) {
>    idx++;
>    console.log(idx);
>  }
>  if (idx < 500) {
>    readData(idx);
>  }
> }
>
> readData(0);
> console.log("after");
> ```
>
> 答案：
>
> ```
> 1
> ~
> 500
> after
> ```

- readData(0) 進入 Stake
- 1 ~ 100
- readData(100) 進入 Stake
- 101 ~ 200
- readData(200) 進入 Stake
- 201 ~ 300
- readData(300) 進入 Stake
- 301 - 400
- readData(400) 進入 Stake
- 401 ~ 500
- readData(400) 執行完畢後離開
- readData(300) 執行完畢後離開
- readData(200) 執行完畢後離開
- readData(100) 執行完畢後離開
- readData(0) 執行完畢後離開
- 執行 console.log("after")

## 問題二

> 題目：
>
> ```
> function readData(idx) {
>  for (let i = 0; i < 100; i++) {
>    idx++;
>    console.log(idx);
>  }
>  if (idx < 500) {
>    setTimeout(function () {
>      readData(idx);
>    }, 0);
>  }
> }
>
> readData(0);
> console.log("after");
> ```
>
> 答案：
>
> ```
> 1
> ~
> 100
> after
> 101
> ~
> 500
> ```

- readData(0) 進入 Stake
- 1 ~ 100
- setTimeout 執行，js 將其丟給 WebAPI 處理
- 繼續執行 console.log("after")
- WebAPI 馬上將 setTimeout 丟回來，放在 task queue 等待 stake 內的 function 執行完畢
- stake 內的 function 執行完畢
- setTimeout 進入 stake 內開始執行
- readData(100) 進入 Stake
- 101 ~ 200
- setTimeout 執行，js 將其丟給 WebAPI 處理
- WebAPI 將 setTimeout 丟回來，直接放入 stake
- readData(200) 進入 Stake
- 201 ~ 300
- 以此類推到 500
