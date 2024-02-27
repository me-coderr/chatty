const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//  /api/user/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please enter all feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      description: "user alredy exists",
    });
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    picture,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      description: "error in registering new user",
    });
    throw new Error("Error in registering new user");
  }
});

// /api/user/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=saeed
const allUsers = asyncHandler(async (req, res) => {
  try {
    // console.log("entering");
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (e) {
    console.log("error occured: ", e.message);
  }
});

module.exports = { registerUser, authUser, allUsers };
