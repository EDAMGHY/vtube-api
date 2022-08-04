const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    image: {
      type: String,
    },
    subscriptions: [
      {
        _id: false,
        channel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'channel',
        },
        channelName: {
          type: String,
        },
        channelImage: {
          type: String,
        },
        subscribers: {
          type: Number,
          default: 0,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('profile', ProfileSchema);
