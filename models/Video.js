const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'channel',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    videoPath: {
      type: String,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    unlikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        text: {
          type: String,
          required: true,
        },
        userName: {
          type: String,
        },
        userImage: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    categoryVids: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'video',
        },
        videoTitle: {
          type: String,
        },
        channelTitle: {
          type: String,
        },
        thumb: {
          type: String,
        },
        views: {
          type: Number,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('video', VideoSchema);
