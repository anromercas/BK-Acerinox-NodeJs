const express = require('express');
const router = express.Router();
const { getUsers, getUser, addUser, deleteUser, updateUser, userByToken, hola } = require('../controllers/users');

const { verifyToken } = require('../middlewares/auth');


router
  .route('/')
  .get( verifyToken, getUsers)
  .post(addUser);
  
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/hola')
  .get(hola);
  
router
  .route('/user/userByToken')
  .get( verifyToken, userByToken);
  

module.exports = router;