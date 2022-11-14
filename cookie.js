const express = require("express");
const cookieParser = require("cookie-parser");
// cookie-parser
// 요청의 쿠키를 해석해서 req.cookies객체로 만듦
// ex. name=hello 라는 쿠키를 보내면, req.cookies -> { name: 'hello' }
// 유효기간이 지난 쿠키는 알아서 제거
const app = express();
const PORT = 8007;

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser()); // req.cookies 가능해짐

// res.cookie(키, 값, 옵션)
// : 쿠키를 '설정'

// res.clearCookie(키, 값, 옵션)
// : 쿠키를 '삭제'

const cookieConfig = {
  httpOnly: true, // 웹서버를 통해서만 쿠키 접근 가능 (js에서 접근 불가능)
  //   maxAge: 24 * 60 * 60 * 1000, // 24시간 60분 60초 1000밀리초(1초) = 하루
  maxAge: 10 * 1000,
  // expires: 만료 날짜 설정
  // secure: https에서만 쿠키 접근
  // signed: 쿠키 암호화
};

app.get("/", (req, res) => {
  // req.cookies.popup
  // 쿠키 설정시: 'hide'
  // 쿠키 미설정시: ''
  res.render("index", { popup: req.cookies.popup });
});

app.post("/setCookie", (req, res) => {
  // 쿠키설정
  res.cookie("popup", "hide", cookieConfig); // 쿠키 설정
  // 응답
  res.send("쿠키 설정 성공!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
