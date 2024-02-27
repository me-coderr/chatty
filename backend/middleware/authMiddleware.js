const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  //   console.log("inside auth middleware");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // decode token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      // console.log(user);
      req.user = user;

      next();
    } catch (e) {
      //   console.log("error in parsing jwt");
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // console.log("jwt not present");
    res.status(401);
    throw new Error("JWT not found");
  }
});

module.exports = { protect };
