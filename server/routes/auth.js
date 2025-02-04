var express = require("express");
var coffeModel = require("../models/").coffee;
var router = express.Router();

async function verifyAdmin(req, res, next) {
  if (!req.session.adminId) return res.status(401).send("沒有登入");

  let data = await coffeModel.getAdminById(req.session.adminId);
  if (data) {
    next();
  } else {
    return res.status(401).send("驗證失敗");
  }
}

router.get("/", verifyAdmin, function (req, res, next) {
  console.log("auth Session:", req.session);
  if (!req.session.adminId) return res.status(401).send("session過期");
  res
    .status(200)
    .send({ adminId: req.session.adminId, name: req.session.name });
});

router.post("/login", async function (req, res, next) {
  try {
    let { adminId, password } = req.body;
    let data = await coffeModel.loginAdmin(adminId, password);

    if (data && data.Password == password) {
      delete data.Password;
      req.session.adminId = data.AdminId;
      req.session.name = data.Name;
      return res.status(200).send({ adminId: data.AdminId, name: data.Name });
    }

    res.clearCookie("connect.sid");
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
