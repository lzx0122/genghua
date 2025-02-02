var express = require('express');
var coffeModel = require('../models/').coffee;
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('需要來點咖啡嗎🤗☕️');
});

//User
router.get('/user', async function (req, res, next) {
  try {
    let data = await coffeModel.getAllUsers()
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/user/:userId', async function (req, res, next) {
  try {
    let { userId } = req.params;
    let data = await coffeModel.getUserByAccount(userId)
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
