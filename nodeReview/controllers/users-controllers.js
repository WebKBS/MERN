const HttpError = require("../models/http-error");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");
const User = require("../models/user");

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

  const { name, email, password } = req.body;

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

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("생성에 실패했습니다. 다시 시도하세요.", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("가입 실패", 500);

    // 반드시 next error를 해줘야 한다. 하지않으면 오류가 발생해도 코드가 실행됨
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" } // 토큰 만료시간 설정
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("가입 실패", 500);

    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
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

  if (!existingUser) {
    const error = new HttpError("회원정보가 일치하지 않습니다.", 401);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("비밀번호가 일치하지 않습니다.");
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("비밀번호가 일치하지 않습니다.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" } // 토큰 만료시간 설정
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("로그인 실패", 500);

    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

module.exports = {
  getUsers: getUsers,
  signup: signup,
  login: login,
};
