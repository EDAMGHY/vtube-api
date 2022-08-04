const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Channel = require('../models/Channel');
const Profile = require('../models/Profile');
const Notification = require('../models/Notification');
const User = require('../models/User');
const Video = require('../models/Video');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { bio, location } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;
  if (req.files['image']) {
    profileFields.image = req.files['image'][0].path;
  }
  if (req.files['cover']) {
    profileFields.cover = req.files['cover'][0].path;
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    // create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error...');
  }
};

// const createUpdateProfile =
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error..');
  }
};
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found!' });
    }
    res.status(500).send('Server Error..');
  }
};
const getSubscriptions = async (req, res) => {
  try {
    const channels = await Channel.find();
    const newChannels = channels
      .map((channel) => {
        return channel.subscribers
          .map(
            (sub) =>
              sub.user.toString() === req.user.id && {
                channel: channel._id,
                channelName: channel.title,
                channelImage: channel.image,
                subscribers: +channel.subscribers.length,
              }
          )
          .filter((channel) => channel);
      })
      .flat();

    let profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({
        errors: [{ msg: 'Profile Not Found!' }],
      });
    }
    profile.subscriptions = [...newChannels];
    await profile.save();
    res.json(profile.subscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userID: req.user.id,
    })
      .populate('channel')
      .populate('video')
      .populate('user')
      .sort({ createdAt: 'desc' });
    res.status(200).json(notifications);
    console.log('notifications', notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
const deleteUser = async (req, res) => {
  try {
    let channel = Channel.findOne({ user: req.user.id });
    //remove channel videos
    if (channel) {
      await Video.findOneAndRemove({ channel: channel._id });
    }
    //remove user channel
    await Channel.findOneAndRemove({ user: req.user.id });
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'user removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error..');
  }
};

module.exports = {
  getCurrentProfile,
  createProfile,
  getProfiles,
  getProfile,
  getSubscriptions,
  getNotifications,
  deleteUser,
};
