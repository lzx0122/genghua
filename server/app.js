var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var coffeeRouter = require("./routes").coffee;
var authRouter = require("./routes").auth;

var cors = require("cors");
require("dotenv").config();

var app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["https://genghua-coffee-app.vercel.app", "http://localhost:5173"], // 你的 Vue 前端網址
    credentials: true, // 允許攜帶 Cookies
  })
);

app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/coffee", coffeeRouter);

module.exports = app;
