var express = require("express");
var coffeModel = require("../models/").coffee;
var router = express.Router();
var authMiddleware = require("../middlewares/").auth;
var jwt = require("jsonwebtoken");

router.get("/", authMiddleware.verifyAdmin, function (req, res, next) {
  if (!req.user.adminId) return res.status(401).send("session過期");
  res.status(200).send({ adminId: req.user.adminId, name: req.user.name });
});

router.post("/login", async function (req, res, next) {
  try {
    let { adminId, password } = req.body;
    let data = await coffeModel.loginAdmin(adminId, password);

    if (data && data.Password == password) {
      const user = { adminId: data.AdminId, name: data.Name };
      const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });


      return res.status(200).send({ user: user, token: token });
    }

    return res.status(401).send("帳號密碼錯誤");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/logout", async function (req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send("登出失敗");
      }

      res.clearCookie("genghua");
      res.status(200).send("登出成功");
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
