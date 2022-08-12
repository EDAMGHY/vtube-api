const { Router } = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/usersUpload');

const {
  getCurrentProfile,
  getProfiles,
  createProfile,
  getProfile,
  getSubscriptions,
  getNotifications,
  deleteUser,
  updateNotifications,
} = require('../controllers/profile');

const router = Router();

// @route GET api/v1/profile/me
// @desc Get current user profile
// @access Private
router.get('/me', auth, getCurrentProfile);

// @route POST api/v1/profile/
// @desc Create or Update user profile
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
      check('bio', 'Bio is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
    ],
  ],
  createProfile
);

// @route GET api/v1/profile/
// @desc Get all profiles
// @access Public

router.get('/', getProfiles);

// @route GET api/v1/profile/user/:user_id
// @desc Get profile by user id
// @access Public

router.get('/user/:user_id', getProfile);

// @route GET api/v1/profile/subscriptions
// @desc GET Profile Subscriptions
// @access Private
router.get('/subscriptions', auth, getSubscriptions);

// @route GET api/v1/profile/notifications
// @desc GET Profile Notifications
// @access Private
router.get('/notifications', auth, getNotifications);
router.put('/showNotifications', auth, updateNotifications);

// @route DELETE api/v1/profile/
// @desc delete profile , user , channel & videos
// @access Private
router.delete('/', auth, deleteUser);
module.exports = router;
