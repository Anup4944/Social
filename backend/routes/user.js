const express = require("express");
const {
  register,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteUserProfile,
  myProfile,
  getUserProfile,
  getAllUserProfile,
  forgetPassword,
  resetPassword,
  getMyPosts,
  getUserPosts,
} = require("../controllers/user");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/follow/:id").get(isAuth, followUser);
router.route("/update/password").put(isAuth, updatePassword);
router.route("/update/profile").put(isAuth, updateProfile);
router.route("/delete/profile").delete(isAuth, deleteUserProfile);
router.route("/profile").get(isAuth, myProfile);
router.route("/user/:id").get(isAuth, getUserProfile);
router.route("/users").get(isAuth, getAllUserProfile);
router.route("/forgot/password").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/myPost").get(isAuth, getMyPosts);
router.route("/usersposts/:id").get(isAuth, getUserPosts);

module.exports = router;
