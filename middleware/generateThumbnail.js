const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

const generateThumbnail = (req, res, next) => {
  if (req.file) {
    console.log('file are here');
    ffmpeg.ffprobe(req.file.path, function (err, metadata) {
      // console.dir(metadata);
      // console.log('duration', metadata.format.duration);
      // fileDuration = metadata.format.duration;
      req.duration = metadata.format.duration;
      if (err) throw err;
    });
    ffmpeg(req.file.path)
      .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '));
        // thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
        req.thumb = 'uploads/thumbnails/' + filenames[0];
      })
      .on('end', function () {
        console.log('Screenshots taken...');
        next();
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the vide
        count: 1,
        folder: 'uploads/thumbnails',
        size: '320x240',
        // %b input basename ( filename w/o extension )
        filename: 'thumbnail-%b.png',
      });
  } else {
    console.log('file are not here');
    next();
  }
};

module.exports = generateThumbnail;
