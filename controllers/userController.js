const User = require("../models/user");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user) {
      res.status(409).json({
        status: "fail",
        message: "user with this email already exists",
      });
    }
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const authUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                status: "error",
                message: "User not found",
            })
        }
        if(user.password !== req.body.password){
            return res.status(401).json({
                status: 'failed',
                message: "Incorrect password",
            })
        }

        res.status(200).json({
            status: 'success',
            token: jwt.sign({userId: user._id}, 'my_secret', {expiresIn: '1d'}),
            user
        })

    } catch(err){
        res.status(400).json({
            message: err.message,
        })
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            status: "success",
            users
        })
    } catch(err){
        res.status(400).json({
            message: err.message,
        })
    }
}

module.exports = {
  createUser,
  getUsers,
  authUser
};
