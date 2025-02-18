// index.js
const line = require("@line/bot-sdk");
var express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// create LINE SDK config from env variables
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
async function handleEvent(event) {
  // 加好友事件
  if (event.type === "follow") {
    let profile = await client.getProfile(event.source.userId);
    const welcomeMessage = {
      type: "text",
      text: `🎉 ${profile.displayName}，歡迎光臨庚樺門市！ 🎉
👋 嗨！${profile.displayName}，很高興認識你～我是你的專屬小助手 🤖✨
🔹 你可以隨時查詢可兌換的商品數量 📦
🔹 紀錄你的商品數量與兌換時間 🕒`,
    };
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [welcomeMessage],
    });
  }

  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create an echoing text message
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
