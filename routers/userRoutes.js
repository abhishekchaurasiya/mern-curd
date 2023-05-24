const express = require("express");
const { signUp, login, logout, showUserDetails  } = require("../controller/User");
const { isAuthenticate } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.get("/logout", logout)
router.get("/getuser", isAuthenticate, showUserDetails)

module.exports = router;