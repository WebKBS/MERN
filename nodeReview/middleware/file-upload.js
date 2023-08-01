const fs = require('fs');
const path = require('path');

const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

// 만약 폴더가 없으면 생성
const createDirectoryIfNotExists = async (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads', 'images');

      // 이미지 저장할 폴더가 있는지 체크
      createDirectoryIfNotExists(uploadDir)
        .then(() => {
          cb(null, 'uploads/images');
        })
        .catch((err) => {
          console.log(err);
          console.log('폴더생성 에러발생');
        });
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v1() + '.' + ext);
    },
  }),

  // 이미지만 검증 필터
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('확장자명이 잘못되었습니다.');
    cb(error, isValid);
  },
});

module.exports = fileUpload;
