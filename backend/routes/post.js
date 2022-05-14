const express = require("express");
const {
  createPost,
  likesAndUnlikePost,
  deletePost,
  getPostOfFollowing,
} = require("../controllers/post");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuth, createPost);
router
  .route("/post/:id")
  .get(isAuth, likesAndUnlikePost)
  .delete(isAuth, deletePost);

router.route("/posts").get(isAuth, getPostOfFollowing);

module.exports = router;
