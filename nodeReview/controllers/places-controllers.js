const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");

const getCoorsForAddress = require("../util/location");
const place = require("../models/place");

let DUMMY_PLACES = [
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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  // const place = DUMMY_PLACES.find((p) => p.id === placeId);

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    console.log(err);
    const error = new HttpError("찾는 아이디가 없습니다.", 500);
    return next(error);
  }

  if (!place) {
    // return res.status(404).json({ message: "일치하는 Id가 없습니다." });
    // const error = new Error("일치하는 Id가 없습니다.");
    // error.code = 404;
    // return next(error);

    const error = new HttpError("일치하는 Id가 없습니다.", 404);
    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator === userId;
  // });

  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    console.log(err);
    const error = new HttpError("일치하는 유저 Id가 없습니다.", 404);
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(new HttpError("일치하는 유저 Id가 없습니다.", 404));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(HttpError("에러가 발생했습니다.", 422));
  }

  const { title, description, address, creator } = req.body;
  // ex) const title = req.body.title;
  let coordinates = await getCoorsForAddress();
  console.log(req.body);

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://modo-phinf.pstatic.net/20170208_281/14865453315606kNKk_JPEG/mosa7CEoze.jpeg?type=w1100",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("디비 생성 실패", 500);

    // 반드시 next error를 해줘야 한다. 하지않으면 오류가 발생해도 코드가 실행됨
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("에러가 발생했습니다.", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    // 해당 아이디가 아니라면
    throw new HttpError("id에 해당하는 장소를 찾지 못했습니다.");
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "삭제완료" });
};

module.exports = {
  getPlaceById: getPlaceById,
  getPlacesByUserId: getPlacesByUserId,
  createPlace: createPlace,
  updatePlaceById: updatePlaceById,
  deletePlace: deletePlace,
};
