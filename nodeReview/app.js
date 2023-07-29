const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  // cors오류를 해결하기위한 header설정/ *를 설정하면 들어오는 모든 요청을 허용한다.

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  // 다른 미들웨어로 전달 되도록 next
  next();
});

app.use("/api/places", placesRoutes); // /api/places/...;

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("라우트가 없습니다.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

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

// username은 데이터베이스 접속 이름
// 비밀번호설정
// <데이터베이스 컬렉션 이름>?retryWrites
//mongodb+srv://<username>:<password>@cluster0.gyoifrn.mongodb.net/?retryWrites=true&w=majority
