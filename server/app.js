var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var coffeeRouter = require("./routes").coffee;
var authRouter = require("./routes").auth;

var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(
  cors({
    origin: ["https://genghua-coffee-app.vercel.app", "http://localhost:5173"], // 你的 Vue 前端網址
    credentials: true, // 允許攜帶 Cookies
  })
);
app.options("*", cors()); // 處理預檢請求
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://genghua-coffee-app.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end(); // 快速響應預檢請求
  }

  next();
});
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/coffee", coffeeRouter);

module.exports = app;
