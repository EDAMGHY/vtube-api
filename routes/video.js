const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const upload = require('../middleware/videoUpload');
const Channel = require('../models/Channel');
const Notification = require('../models/Notification');
const generateThumbnail = require('../middleware/generateThumbnail');
const Video = require('../models/Video');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { checkIsSubscribed, checkIsNotified } = require('../utils');
const router = Router();

// @route POST api/v1/video/:idChanel
// @desc Upload a Video
// @access Private
const cUploads = upload.fields([{ name: 'thumbnail', maxCount: 1 }]);
const vidUpload = upload.single('videoPath');
router.post(
  '/',
  [
    auth,
    vidUpload,
    generateThumbnail,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, category, tags } = req.body;
    const { _id: channel } = await Channel.findOne({ user: req.user.id });
    const channelUser = await Channel.findOne({ user: req.user.id });
    if (!channel) {
      return res
        .status(404)
        .json({ msg: 'You have to create a channel first!' });
    }
    const videoFields = {};
    videoFields.channel = channel._id;
    if (title) videoFields.title = title;
    if (description) videoFields.description = description;
    if (category) videoFields.category = category;
    if (tags) {
      videoFields.tags = tags.split(',').map((tag) => tag.trim());
    }

    try {
      if (req.file) {
        videoFields.videoPath = req.file.path;
      }

      if (req.duration) {
        videoFields.duration = req.duration;
      }
      if (req.thumb) {
        videoFields.thumbnail = req.thumb;
      }
      const video = new Video(videoFields);
      console.log(videoFields);
      await video.save();

      channelUser.usersToNotify.forEach(async (user) => {
        const notification = await Notification({
          user: user.user,
          video: video._id,
          channel: channel._id,
          userID: user.user.toString(),
        });
        await notification.save();
      });

      res.status(201).json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/v1/video
// @desc GET all videos
// @access Public
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route GET api/v1/video/myvideos
// @desc GET user channel videos
// @access Private
router.get('/myvideos', auth, async (req, res) => {
  try {
    const { _id: channel } = await Channel.findOne({ user: req.user.id });
    if (!channel) {
      return res
        .status(404)
        .json({ msg: 'You have to create a channel first!' });
    }
    const videos = await Video.find({ channel }).sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route GET api/v1/video/:channelId/videos
// @desc GET a channel videos
// @access Private
router.get('/:channelId/videos', async (req, res) => {
  try {
    const { channelId } = req.params;
    const videos = await Video.find({ channel: channelId })
      .populate('channel', ['image', 'subscribers', 'title'])
      .sort({
        createdAt: -1,
      });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route DELETE api/v1/video
// @desc DELETE a video from channel
// @access Private
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id).populate('channel', [
      'image',
      'subscribers',
      'title',
    ]);
    if (!video) {
      return res.status(404).json({ msg: 'There is no video with this ID' });
    }
    await video.remove();
    res.status(200).json({ msg: 'Video removed!' });
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'There is no video with this ID!' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/v1/video/:id
// @desc GET single video
// @access Private
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const videos = await Video.find().populate('channel', ['image', 'title']);
    const video = await Video.findById(id).populate('channel', [
      'image',
      'title',
      'subscribers',
      'usersToNotify',
    ]);
    if (!video) {
      return res.status(404).json({ msg: 'Video not found!' });
    }
    video.views += 1;

    const catVid = {};
    video.categoryVids = [];
    videos
      .filter(
        (vid) =>
          vid.category === video.category &&
          vid._id.toString() !== video._id.toString()
      )
      .forEach((v) => {
        catVid.video = v._id;
        catVid.videoTitle = v.title;
        catVid.channelTitle = v.channel.title;
        catVid.thumb = v.thumbnail;
        catVid.views = v.views;
        catVid.createdAt = v.createdAt;
        video.categoryVids = [...video.categoryVids, catVid];
      });

    await video.save();
    let newVideo = { ...video._doc };
    newVideo.subscribed = checkIsSubscribed(newVideo.channel, req.user.id);
    newVideo.notified = checkIsNotified(newVideo.channel, req.user.id);
    res.status(200).json(newVideo);
  } catch (err) {
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Video not found!' });
    }
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/v1/video/like/:id
// @desc Like a Video
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate({
      path: 'channel',
      populate: { path: 'user' },
    });
    console.log(video);
    // check if the video is already been liked
    if (
      video.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Video already liked!' });
    }
    video.likes.unshift({ user: req.user.id });
    const profile = await Profile.findOne({ user: video.channel.user._id });
    if (video.channel.user._id.toString() !== req.user.id) {
      const notification = await Notification({
        user: req.user.id,
        video: video._id,
        channel: video.channel._id,
        userID: profile.user,
        type: 'like',
      });
      await notification.save();
    }
    if (
      video.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
        .length > 0
    ) {
      // get remove index
      const removeIndex = video.unlikes
        .map((unlike) => unlike.user.toString())
        .indexOf(req.user.id);
      video.unlikes.splice(removeIndex, 1);
    }
    await video.save();
    res.json(video.likes);
  } catch (err) {
    console.error(err);
    console.error(err.message);

    res.status(500).send('Server Error...');
  }
});
// @route PUT api/v1/video/unlike/:id
// @desc UnLike a Video
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    // check if the video is already been liked
    if (
      video.unlikes.filter((unlike) => unlike.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Video already unliked!' });
    }
    video.unlikes.unshift({ user: req.user.id });
    if (
      video.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      // get remove index
      const removeIndex = video.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      video.likes.splice(removeIndex, 1);
    }
    await video.save();
    res.json(video.unlikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});
// @route POST api/v1/video/comment/:id
// @desc Comment on a video
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const { image: userImage } = await Profile.findOne({ user: req.user.id });
      const video = await Video.findById(req.params.id).populate({
        path: 'channel',
        populate: { path: 'user' },
      });
      const newComment = {
        text: req.body.text,
        userName: user.name,
        userImage,
        user: req.user.id,
      };
      video.comments.unshift(newComment);
      const profile = await Profile.findOne({ user: video.channel.user._id });
      if (profile.user.toString() !== req.user.id) {
        const notification = await Notification({
          user: req.user.id,
          video: video._id,
          channel: video.channel._id,
          userID: profile.user,
          type: 'comment',
        });
        await notification.save();
      }
      await video.save();
      res.json(video.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route DELETE api/v1/video/comment/:id/:comment_id
// @desc DELETE Comment on a video
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    // pull out comment
    const comment = video.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // make sure comment exists
    if (!comment) {
      return res.status(400).json({ msg: 'Comment does not exist!' });
    }
    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized!' });
    }
    const removeIndex = video.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    video.comments.splice(removeIndex, 1);

    await video.save();
    res.json(video.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/v1/video
// @desc Update a video
// @access Private
router.put(
  '/:id/edit',
  [auth, vidUpload, generateThumbnail],
  async (req, res) => {
    const { id } = req.params;
    const { title, description, category, tags } = req.body;
    const { _id: channel } = await Channel.findOne({ user: req.user.id });
    if (!channel) {
      return res
        .status(404)
        .json({ msg: 'You have to create a channel first!' });
    }
    const videoFields = {};
    videoFields.channel = channel._id;
    if (title) videoFields.title = title;
    if (description) videoFields.description = description;
    if (category) videoFields.category = category;
    if (tags) {
      videoFields.tags = tags.split(',').map((tag) => tag.trim());
    }

    try {
      if (req.file) {
        videoFields.videoPath = req.file.path;
      }
      if (req.duration) {
        videoFields.duration = req.duration;
      }
      if (req.thumb) {
        videoFields.thumbnail = req.thumb;
      }
      let video = await Video.findById(id);
      if (!video) {
        return res.status(404).json({ msg: 'There is no video with this ID' });
      }
      // update
      video = await Video.findOneAndUpdate({ _id: id }, { $set: videoFields });
      await video.save();
      return res.json(video);
    } catch (err) {
      if (err.kind == 'ObjectId') {
        return res.status(400).json({ msg: 'There is no video with this ID!' });
      }
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
