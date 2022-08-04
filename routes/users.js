const { Router } = require('express');
const { check } = require('express-validator');
const { register } = require('../controllers/users');

const router = Router();

// @route POST api/v1/users
// @desc Register User
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required...!').not().isEmpty(),
    check('email', 'Please Include a valid Email...!').isEmail(),
    check(
      'password',
      'Please Enter a password with 8 or more characters...'
    ).isLength({ min: 8 }),
  ],
  register
);

module.exports = router;
