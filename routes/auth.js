const { Router } = require('express');
const { getUserByToken, login } = require('../controllers/auth');
const auth = require('../middleware/auth');
const router = Router();
const { check } = require('express-validator');
// @route GET api/v1/auth
// @desc Get user by token
// @access Private
router.get('/', auth, getUserByToken);

// @route POST api/v1/auth
// @desc Authenticate User & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please Include a valid Email!').isEmail(),
    check('password', 'Password is required!').exists(),
  ],
  login
);
module.exports = router;
