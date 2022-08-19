const { Router } = require('express');
const auth = require('../middleware/auth');
const Channel = require('../models/Channel');
const Notification = require('../models/Notification');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/channelUpload');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { checkIsSubscribed, checkIsNotified } = require('../utils');

const router = Router();
// @route GET api/v1/channel/mychannel
// @desc Get user channel
// @access Private
router.get('/mychannel', auth, async (req, res) => {
  try {
    const channel = await Channel.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!channel) {
      return res.status(400).json({ msg: 'There is no channel for this user' });
    }

    res.json(channel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/v1/channel/
// @desc Create or Update Channel
// @access Private
const cUploads = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'cover', maxCount: 1 },
]);
router.post(
  '/',
  [
    auth,
    cUploads,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;
    const channelFields = {};
    channelFields.user = req.user.id;
    if (title) channelFields.title = title;
    if (description) channelFields.description = description;
    if (req.files['image']) {
      channelFields.image = req.files['image'][0].path;
    }
    if (req.files['cover']) {
      channelFields.cover = req.files['cover'][0].path;
    }
    try {
      let channelTitle = await Channel.findOne({ title });
      if (channelTitle && channelTitle.user.toString() !== req.user.id) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Channel already exists!' }] });
      }
      let channel = await Channel.findOne({ user: req.user.id });
      if (channel) {
        // update
        channel = await Channel.findOneAndUpdate(
          { user: req.user.id },
          { $set: channelFields },
          { new: true }
        );
        return res.json(channel);
      }
      // create
      channel = new Channel(channelFields);
      await channel.save();
      res.json(channel);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error...');
    }
  }
);

// @route GET api/v1/channel/
// @desc Get all channels
// @access Public

router.get('/', auth, async (req, res) => {
  try {
    const channels = await Channel.find().populate('user', ['name']);
    let newChannels = [...channels.map((item) => item._doc)];
    newChannels = newChannels.map((item) => ({
      ...item,
      subscribed: checkIsSubscribed(item, req.user.id),
      notified: checkIsNotified(item, req.user.id),
    }));

    res.json(newChannels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error..');
  }
});

// @route GET api/v1/channel/user/:user_id
// @desc Get channel by user id
// @access Public

router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const channel = await Channel.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);
    if (!channel) {
      return res.status(400).json({ msg: 'Channel not found!' });
    }
    let newChannel = { ...channel._doc };
    newChannel.subscribed = checkIsSubscribed(channel, req.user.id);
    newChannel.notified = checkIsNotified(channel, req.user.id);
    res.json(newChannel);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Channel not found!' });
    }
    res.status(500).send('Server Error..');
  }
});
// @route GET api/v1/channel/subscribers
// @desc Get channel subscribes
// @access Private
router.get('/subscribers', auth, async (req, res) => {
  try {
    const channel = await Channel.findOne({ user: req.user.id });
    const users = await User.find();
    const newSub = channel.subscribers
      .map((sub) => {
        return users
          .map((u) => {
            if (sub.user.toString() === u._id.toString()) {
              return sub;
            }
          })
          .flat();
      })
      .flat()
      .filter((sub) => sub);
    channel.subscribers = [...newSub];
    await channel.save();
    res.json(newSub);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route PUT api/v1/channel/subscribe:idChannel
// @desc Subscribe to a channel
// @access Private
router.put('/subscribe/:idChannel', auth, async (req, res) => {
  const { idChannel } = req.params;
  try {
    let channel = await Channel.findOne({ _id: idChannel }).populate('user', [
      'name',
    ]);
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name']
    );
    const oldSub = channel.subscribers.find(
      (subscriber) => subscriber.user.toString() === req.user.id
    );
    if (oldSub) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already Subscribed!' }] });
    }

    const subscriber = {
      user: req.user.id,
      userName: profile.user.name,
      userImage: profile.image,
    };
    channel.subscribers.unshift(subscriber);
    await channel.save();
    if (channel.user._id.toString() !== req.user.id) {
      const notification = await Notification({
        user: req.user.id,
        channel: channel._id,
        type: 'subscribe',
        userID: channel.user._id.toString(),
      });
      await notification.save();
    }
    res.json(channel);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// @route PUT api/v1/channel/unsubscribe:idChannel
// @desc Unsubscribe to a channel
// @access Private
router.put('/unsubscribe/:idChannel', auth, async (req, res) => {
  const { idChannel } = req.params;
  try {
    let channel = await Channel.findOne({ _id: idChannel });
    const oldSub = channel.subscribers.find(
      (subscriber) => subscriber.user.toString() === req.user.id
    );
    if (!oldSub) {
      return res.status(400).json({
        errors: [{ msg: "User didn't subscribed to this channel!" }],
      });
    }
    // get remove index
    const removeIndex = channel.subscribers
      .map((sub) => sub.user.toString())
      .indexOf(req.user.id);
    channel.subscribers.splice(removeIndex, 1);
    // channel.subscribers.unshift(subscriber);
    await channel.save();
    res.json(channel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/v1/channel/:id
// @desc Delete a channel
// @access Private
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(404).json({ msg: 'Channel not found' });
    }
    // check user
    if (channel.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not Authorized!' });
    }
    // //remove channel
    await channel.remove();
    res.json({ msg: 'Channel removed!' });
    //res.json({ profiles });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Channel not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/v1/channel/notify/:id
// @desc notify a channel
// @access Private
router.put('/notify/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id);
    // check if the post is already been liked
    if (
      channel.usersToNotify.filter(
        (notify) => notify.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Channel already notified!' });
    }
    channel.usersToNotify.unshift({ user: req.user.id });
    await channel.save();
    res
      .status(200)
      .json({ msg: "You'll get video notification from this channel!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});
// @route PUT api/v1/channel/unnotify/:id
// @desc unnotify a channel
// @access Private
router.put('/unnotify/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id);
    // check if the channel is already been liked
    if (
      channel.usersToNotify.filter(
        (notify) => notify.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'Channel has not yet been notified!' });
    }
    // get remove index
    const removeIndex = channel.usersToNotify
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    channel.usersToNotify.splice(removeIndex, 1);
    await channel.save();
    res.status(200).json({ msg: 'Notification disabled for this channel!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
});

module.exports = router;
