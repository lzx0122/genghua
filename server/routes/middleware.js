var coffeModel = require("../models/").coffee;

module.exports = {
  async verifyAdmin(req, res, next) {
    if (!req.session.adminId) return res.status(401).send("沒有登入");

    let data = await coffeModel.getAdminById(req.session.adminId);
    if (data) {
      next();
    } else {
      return res.status(401).send("驗證失敗");
    }
  },
};
