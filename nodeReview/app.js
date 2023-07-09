const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // /api/places/...;

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("라우트가 없습니다.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "요청한 페이지가 없습니다." });
});

require("dotenv").config();
const url = process.env.MONGODB_URL;
// mongoose가 성공적으로 연결되면 서버 열림
mongoose
  .connect(url)
  .then(() => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
  });

//mongodb+srv://<username>:<password>@cluster0.gyoifrn.mongodb.net/?retryWrites=true&w=majority
