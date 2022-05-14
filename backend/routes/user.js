const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuth, followUser);
router.route("/update/password").put(isAuth, updatePassword);
router.route("/update/profile").put(isAuth, updateProfile);

module.exports = router;
