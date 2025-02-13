var express = require("express");
var coffeModel = require("../models/").coffee;
var authMiddleware = require("../middlewares").auth;
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("需要來點咖啡嗎🤗☕️");
});

//User

router.get("/user/:userId", async function (req, res, next) {
  try {
    let { userId } = req.params;
    let data = await coffeModel.getUserByAccount(userId);

    if (!data) return res.status(404).send("沒有查詢到此會員");
    delete data.Desc;
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get(
  "/admin/user",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let data = await coffeModel.getAllUsers();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/admin/user",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { account, name, date, email, desc } = req.body;
      let data = await coffeModel.addUser(account, name, date, email, desc);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get(
  "/admin/user/account/:account",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { account } = req.params;
      let data = await coffeModel.getUserByAccount(account);
      if (!data) return res.status(404).send("沒有查詢到此會員");
      data = await coffeModel.getUserAndLogsByUserData(data);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get(
  "/admin/users/date/:date",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { date } = req.params;
      let data = await coffeModel.getUsersByDate(date);
      if (!data) return res.status(404).send("沒有查詢到此會員");
      for (const [index, d] of data.entries()) {
        data[index] = await coffeModel.getUserAndLogsByUserData(d);
      }
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//item

router.get("/item", async function (req, res, next) {
  try {
    let data = await coffeModel.getAllItem();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/item/:itemid", async function (req, res, next) {
  try {
    let { itemid } = req.params;
    let data = await coffeModel.getItemById(itemid);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post(
  "/admin/item",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { itemId, name } = req.body;

      let data = await coffeModel.addItem(itemId, name);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/admin/item/:id",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { itemId, name } = req.body;
      let { id } = req.params;

      let data = await coffeModel.updateItem(id, itemId, name);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/admin/item/:id",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { id } = req.params;

      let data = await coffeModel.deleteItem(id);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//keeps

router.get(
  "/admin/keep/:keepId",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { keepId } = req.params;

      let data = await coffeModel.getKeepById(keepId);
      console.log(data);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/admin/keep",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { account, itemId, amount, itemName } = req.body;
      let data = await coffeModel.addKeep(
        account,
        req.user.adminId,
        itemId,
        itemName,
        amount,
        new Date().getTime()
      );
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/admin/keep/:keepId",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { keepId } = req.params;

      let data = await coffeModel.deleteKeep(keepId);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/admin/keep/:id",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { itemId, amount } = req.body;
      let { id } = req.params;

      let data = await coffeModel.updateKeep(id, itemId, parseInt(amount));
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/admin/keep/pickup/:id",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { date, amount } = req.body;
      let { id } = req.params;

      let data = await coffeModel.addKeepPickup(
        id,
        date ?? new Date().getTime(),
        req.user.adminId,
        parseInt(amount)
      );
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/admin/keep/pickup/:id/:index",
  authMiddleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { id, index } = req.params;

      let data = await coffeModel.deleteKeepPickup(id, index);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
