const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

// @desc    login mobile user
// @route   POST /api/v1/login
// @access  Public
exports.loginMobile = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userLogin = { email, password };
      const user = await User.findOne({email: userLogin.email});

      if(!user) {
          return res.status(400).json({
              success: false,
              error: '(User) or password wrong'
          });
      }

      if (!bcrypt.compareSync(userLogin.password, user.password)) {
        return res.status(400).json({
            success: false,
            error: 'User or (password) wrong'
        });
      }

        let token = await jwt.sign({
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