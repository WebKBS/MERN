const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    // return res.status(404).json({ message: "일치하는 Id가 없습니다." });
    // const error = new Error("일치하는 Id가 없습니다.");
    // error.code = 404;
    // return next(error);

    throw new HttpError("일치하는 Id가 없습니다.", 404);
  }

  res.json({ place });
};

// const getPlaceByUserId = (req, res, next) => {
//   const userId = req.params.uid;

//   const place = DUMMY_PLACES.find((p) => {
//     return p.creator === userId;
//   });

//   if (!place) {
//     // return res.status(404).json({ message: "일치하는 유저 Id가 없습니다." });
//     // const error = new Error("일치하는 유저 Id가 없습니다.");
//     // error.code = 404;
//     // return next(error);

//     throw new HttpError("일치하는 유저 Id가 없습니다.", 404);
//   }

//   res.json({ place });
// };

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    console.log(p);
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    // return res.status(404).json({ message: "일치하는 유저 Id가 없습니다." });
    // const error = new Error("일치하는 유저 Id가 없습니다.");
    // error.code = 404;
    // return next(error);

    return next(new HttpError("일치하는 유저 Id가 없습니다.", 404));
  }

  console.log(places);

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  // ex) const title = req.body.title;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = (req, res, next) => {
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
