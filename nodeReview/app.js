const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-route");

const app = express();

app.use("/api/places", placesRoutes); // /api/places/...;

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "요청한 페이지가 없습니다." });
});

app.listen(4000);
