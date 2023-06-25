const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Hello",
    description: "World",
    location: {
      lat: 40.743243,
      lng: -73.32523,
    },
    address: "adress",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    // return res.status(404).json({ message: "일치하는 Id가 없습니다." });
    const error = new Error("일치하는 Id가 없습니다.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    // return res.status(404).json({ message: "일치하는 유저 Id가 없습니다." });
    const error = new Error("일치하는 유저 Id가 없습니다.");
    error.code = 404;
    return next(error);
  }

  res.json({ place });
});

module.exports = router;
