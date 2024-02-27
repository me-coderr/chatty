const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// for registering new user
router.post("/", registerUser);

// for login
router.route("/login").post(authUser);

// to get all users
router.route("/").get(protect, allUsers);

module.exports = router;
