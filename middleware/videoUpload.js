const path = require('path');
const fs = require('fs');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `uploads/videos`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == 'video/mp4') {
      callback(null, true);
    } else {
      console.log('only mp4 videos are supported...');
      callback(null, false);
    }
  },
});

module.exports = upload;
