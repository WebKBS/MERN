const fs = require("fs");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const mongoose = require("mongoose");

const getCoorsForAddress = require("../util/location");
const User = require("../models/user");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new HttpError("찾는 아이디가 없습니다.", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("일치하는 Id가 없습니다.", 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    console.log(err);
    const error = new HttpError("일치하는 유저 Id가 없습니다.", 500);
    return next(error);
  }

  // if(!places || places.length === 0)
  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(new HttpError("일치하는 유저 Id가 없습니다.", 404));
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(HttpError("에러가 발생했습니다.", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates = await getCoorsForAddress();

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator,
  });

  // user가 있는지 확인
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    console.log(err);
    const error = new HttpError("장소 생성에 실패했습니다.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("ID에 해당한 유저를 찾을수 없습니다.", 404);
    return next(error);
  }

  // console.log(user);

  try {
    // await createdPlace.save();

    //session 설정
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("디비 생성 실패", 500);

    // 반드시 next error를 해줘야 한다. 하지않으면 오류가 발생해도 코드가 실행됨
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // throw new HttpError("에러가 발생했습니다.", 422);
    return next(new HttpError("에러가 발생했습니다.", 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new HttpError("업데이트에 실패하였습니다.", 500);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("업데이트 저장 실패.", 500);
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    console.log(err);
    const error = new HttpError("삭제가 되지 않았습니다.", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("제공된 place id가 없습니다.", 404);
    return next(error);
  }

  const imagePath = place.image;
  console.log(imagePath);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("삭제가 되지 않았습니다.", 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
    console.log("이미지가 삭제되었습니다.");
  });

  res.status(200).json({ message: "삭제완료" });
};

module.exports = {
  getPlaceById: getPlaceById,
  getPlacesByUserId: getPlacesByUserId,
  createPlace: createPlace,
  updatePlaceById: updatePlaceById,
  deletePlace: deletePlace,
};
