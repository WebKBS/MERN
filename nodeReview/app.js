const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); // /api/places/...;

app.use("u/api/sers", usersRoutes);

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

app.listen(4000);
