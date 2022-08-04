const path = require('path');
const fs = require('fs');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `uploads/users`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/png'
    ) {
      callback(null, true);
    } else {
      console.log('only jpg, jpeg and png are supported...');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
