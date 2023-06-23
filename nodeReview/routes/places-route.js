const express = require("express");

const router = express.Router();

router.get("/places", (req, res, next) => {
  console.log("get places");
  res.json({ message: "WWWWoRRRKK!!" });
});

module.exports = router;
