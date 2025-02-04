var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var coffeeRouter = require("./routes").coffee;
var authRouter = require("./routes").auth;
var session = require("express-session");
var cors = require("cors");
require("dotenv").config();

var app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://genghua.vercel.app"], // 你的 Vue 前端網址
    credentials: true, // 允許攜帶 Cookies
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY, // 用於簽名 session ID
    resave: false,
    saveUninitialized: false,
    name: "genghua",
    cookie: {
      secure: true, // 🔥 只允許 HTTPS 環境傳遞 Cookies
      httpOnly: true,
      sameSite: "lax", maxAge: 30 * 60 * 1000
    }, // 設定 cookie 有效時間為 30 分鐘

  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/coffee", coffeeRouter);

module.exports = app;
