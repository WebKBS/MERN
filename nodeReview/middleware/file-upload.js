const multer = require("multer");
const uuid = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, uuid.v1() + "." + ext);
    },
  }),

  // 이미지만 검증 필터
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("확장자명이 잘못되었습니다.");
    callback(error, isValid);
  },
});

module.exports = fileUpload;
