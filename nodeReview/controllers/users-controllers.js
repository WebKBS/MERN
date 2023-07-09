const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Kang",
    email: "text@text.com",
    password: "testers",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    // -password를 붙이면 get 요청시 password 정보는 제외된다.
    users = await User.find({}, "-password");
  } catch (err) {
    console.log(err);
    const error = new HttpError("유저 가져오기 실패", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // throw new HttpError("signup 에러가 발생했습니다.", 422);

    // 디비 연결후에는 반드시 next로
    return next(new HttpError("signup 에러가 발생했습니다.", 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HttpError("가입에 실패하였습니다.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("이미 사용자가 존재합니다.", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://modo-phinf.pstatic.net/20170208_281/14865453315606kNKk_JPEG/mosa7CEoze.jpeg?type=w1100",
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("가입 실패", 500);

    // 반드시 next error를 해줘야 한다. 하지않으면 오류가 발생해도 코드가 실행됨
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HttpError("로그인에 실패하였습니다.", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("회원정보가 일치하지 않습니다.", 401);
    return next(error);
  }

  res.json({ message: "Login!!" });
};

module.exports = {
  getUsers: getUsers,
  signup: signup,
  login: login,
};
