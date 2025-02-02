var express = require("express");
var coffeModel = require("../models/").coffee;
var middleware = require("./middleware");
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
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get(
  "/admin/user",
  middleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let data = await coffeModel.getAllUsers();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

router.get(
  "/admin/user/:userId",
  middleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { userId } = req.params;
      let data = await coffeModel.getUserByAccount(userId);
      data = await coffeModel.getUserAndLogsByUserData(data);
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
  middleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { itemId, name } = req.body;

      let data = await coffeModel.addItem(itemId, name);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

router.put(
  "/admin/item/:id",
  middleware.verifyAdmin,
  async function (req, res, next) {
    try {
      let { itemId, name } = req.body;
      let { id } = req.params;

      let data = await coffeModel.updateItem(id, itemId, name);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

router.delete(
  "/admin/item/:id",
  middleware.verifyAdmin,
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

module.exports = router;
