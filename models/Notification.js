const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'video',
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channel',
    },
    type: {
      type: String,
      enum: ['upload', 'subscribe', 'comment', 'like'],
      default: 'upload',
    },
    show: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('notification', NotificationSchema);
