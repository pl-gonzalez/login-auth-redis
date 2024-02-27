const express = require("express");
const app = express();
const redisClient = require("./redis");

app.get("/set", async (req, res, next) => {
  try {
    const data = req.query.p;
    await redisClient.set("test", data);
    res.status(200).json({
      message: "data cached",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/get", async (req, res, next) => {
  try {
    // const data = await redisClient.get("test");
    const data = await reddisClient.get("test").then((data) => {
      return data;
    });
    res.status(200).json({
      message: "Cached data retrieved",
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Node server started");
});