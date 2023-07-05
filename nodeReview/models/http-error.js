class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // message프로퍼티 추가
    this.code = errorCode;
  }
}

module.exports = HttpError;
