var express = require("express");
var coffeModel = require("../models/").coffee;
var router = express.Router();
var jwt = require("jsonwebtoken");

async function verifyAdmin(req, res, next) {
  const token = req.cookies.genghua;
  if (!token) return res.status(401).send("沒有登入");
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) return res.sendStatus(403); // 禁止訪問
    let r = await coffeModel.getAdminById(user.adminId);
    if (!r) {
      return res.status(401).send("驗證失敗");
    }

    req.user = user; // 將用戶資料附加到請求中
    next();
  });
}

router.get("/", verifyAdmin, function (req, res, next) {
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
      // 設置 cookie
      res.cookie("genghua", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // 僅在生產環境中使用 HTTPS
        maxAge: 3600000, // 1 小時
        sameSite: "none",
        path: "/", // 允許所有路徑存取
      });

      return res.status(200).send(user);
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
