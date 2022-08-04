const { Router } = require('express');
const Channel = require('../models/Channel');
const Video = require('../models/Video');
const Profile = require('../models/Profile');

const router = Router();

router.get('/', async (req, res) => {
  const { term, cat, sort } = req.query;
  let searchedItems = [];
  try {
    if (term) {
      switch (cat) {
        // search all
        case 'all':
          let videosAll = await Video.find({
            title: { $regex: term, $options: 'i' },
          })
            .populate('channel', ['image', 'title', 'subscribers'])
            .sort({ createdAt: -1 });

          let profilesAll = await Profile.find().populate('user', ['name']);
          profilesAll = profilesAll.filter((p) =>
            p.user.name.toLowerCase().includes(term.toLowerCase())
          );

          let channelsAll = await Channel.find({
            title: { $regex: term, $options: 'i' },
          });
          console.log(profilesAll, term);
          searchedItems = [...videosAll, ...channelsAll, ...profilesAll];
          break;
        // search  by videos
        case 'videos':
          let videosV = await Video.find({
            title: { $regex: term, $options: 'i' },
          }).populate('channel', ['image', 'title', 'subscribers']);

          searchedItems = [...videosV];
          break;
        // search by channels
        case 'channels':
          let channelsV = await Channel.find({
            title: { $regex: term, $options: 'i' },
          });
          searchedItems = [...channelsV];

          break;
        // search bu tags
        case 'tags':
          let videosT = await Video.find().populate('channel', [
            'image',
            'title',
            'subscribers',
          ]);

          videosT = videosT
            .map((vid) => vid.tags.includes(term) && vid)
            .filter((vid) => vid);
          searchedItems = [...videosT];

          break;
        // search by users
        case 'users':
          let profilesU = await Profile.find().populate('user', ['name']);
          profilesU = profilesU.filter((p) =>
            p.user.name.toLowerCase().includes(term.toLowerCase())
          );
          searchedItems = [...profilesU];

          break;
        default:
          // searchedItems = await Video.find().sort({ createdAt: -1 });
          searchedItems = await Video.find().populate('channel', [
            'image',
            'title',
          ]);
          break;
      }
    } else {
      searchedItems = await Video.find().populate('channel', [
        'image',
        'title',
      ]);
    }
    if (sort) {
      switch (sort) {
        case 'a-z':
          searchedItems.sort((a, b) =>
            a.title && !a.user
              ? a.title.toLowerCase() > b.title.toLowerCase()
                ? 1
                : b.title.toLowerCase() > a.title.toLowerCase()
                ? -1
                : 0
              : a.user.name.toLowerCase() > b.user.name.toLowerCase()
              ? 1
              : b.user.name.toLowerCase() > a.user.name.toLowerCase()
              ? -1
              : 0
          );
          console.log('a-z');
          break;
        case 'z-a':
          searchedItems.sort((a, b) =>
            a.title && !a.user
              ? a.title.toLowerCase() < b.title.toLowerCase()
                ? 1
                : b.title.toLowerCase() < a.title.toLowerCase()
                ? -1
                : 0
              : a.user.name.toLowerCase() < b.user.name.toLowerCase()
              ? 1
              : b.user.name.toLowerCase() < a.user.name.toLowerCase()
              ? -1
              : 0
          );
          console.log('z-a');
          break;
        case 'oldest':
          searchedItems.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          console.log('oldest');
          break;
        case 'newest':
          searchedItems.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          console.log('newest');
          break;
        case 'views':
          searchedItems.sort(
            // (a, b) => a.views && cat === 'videos' && b.views - a.views
            (a, b) => b.views - a.views
          );
          break;
        default:
          searchedItems = [...searchedItems];
          break;
      }
    }
    res.status(200).json(searchedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:category', async (req, res) => {
  const { category } = req.params;
  try {
    let videos = await Video.find({ category });
    res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
