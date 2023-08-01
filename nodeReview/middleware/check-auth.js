const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  try {
    // 쿼리 대신 헤더를 통해 보호
    const token = req.headers.authorization.split(' ')[1]; // Authorization "Token"

    if (!token) {
      throw new Error('인증 실패!');
    }

    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('토큰 인증에 실패하였습니다.', 401);
    console.log(err);
    return next(error);
  }
};
