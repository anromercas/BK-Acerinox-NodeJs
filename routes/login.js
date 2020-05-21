const express = require('express');
const router = express.Router();
const { loginMobile } = require('../controllers/login');

router
  .route('/')
  .post(loginMobile)

/* router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser) */

module.exports = router;