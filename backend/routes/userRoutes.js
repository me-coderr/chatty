const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

// for registering new user
router.post("/", registerUser);

// for login
router.route("/login").post(authUser);

module.exports = router;
