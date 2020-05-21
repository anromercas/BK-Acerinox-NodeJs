const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });


// @desc    Get all user instances
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.find({}, 'email firstname secondname lastname department role active');
  
      return res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
}

// @desc    Get a user instance
// @route   GET /api/v1/users
// @access  Public
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
  
      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
}

// @desc    Add user
// @route   POST /api/v1/users
// @access  Public
exports.addUser = async (req, res, next) => {
    try {
      const { email, password, firstname, secondname, lastname, department, role, avatar } = req.body;
      const aNewUser = {
        email, 
        password: bcrypt.hashSync(password, 10), 
        firstname, 
        secondname, 
        lastname, 
        department, 
        role, 
        avatar
      }
      const user = await User.create(aNewUser);
    
      return res.status(201).json({
        success: true,
        data: user
      }); 
    } catch (err) {
        console.log(err);
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  }

// @desc    Delete checklist (it does not delete in cascade)
// @route   DELETE /api/v1/checklists/:id
// @access  Public
exports.deleteUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (user)
        await user.remove();
      else 
        console.log('it was not present!');
        
      return res.status(200).json({
        success: true,
        data: {}
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }

// @desc    Update user
// @route   PUT /api/v1/users
// @access  Public
exports.updateUser = async (req, res, next) => {
    try {
      const { email, password, firstname, secondname, lastname, department, role, avatar, active } = req.body;
      const aUpdatedUser = {
        email, password, firstname, secondname, lastname, department, role, avatar, active
      }
      const options = {
        new: true,
        runValidators: true,
        context: 'query'
      };
      const user = await User.findByIdAndUpdate(req.params.id, aUpdatedUser, options);

      let token = jwt.sign({
        user: user
      }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRES });
    
      return res.status(201).json({
        success: true,
        data: {user, token}
      }); 
    } catch (err) {
        console.log(err);
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  }

// @desc    get user by token
// @route   GET /api/v1/users/userByToken
// @access  Public
exports.userByToken = async (req, res, next) => {
  try {

    const user = req.user;

    return res.status(201).json({
      success: true,
      message: 'User by token',
      user
    }); 

  } catch(err) {
    console.log(err);
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
  }
  
}

exports.hola = (req, res ) => {
  return res.json({
    message: "hola"
  })
}
