const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, requried: true },
  description: { type: String, requried: true },
  image: { type: String, requried: true },
  address: { type: String, requried: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: String, requried: true },
});

// 모델의 첫글자는 대문자여야한다.
module.exports = mongoose.model("Place", placeSchema);
