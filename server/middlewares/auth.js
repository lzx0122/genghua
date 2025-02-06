var coffeModel = require("../models/").coffee;
var jwt = require("jsonwebtoken");

module.exports = {
    async verifyAdmin(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
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
    },
};
