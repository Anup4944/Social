const express = require("express");
const {
  createPost,
  likesAndUnlikePost,
  deletePost,
  getPostOfFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
} = require("../controllers/post");
const { isAuth } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuth, createPost);
router
  .route("/post/:id")
  .get(isAuth, likesAndUnlikePost)
  .put(isAuth, updateCaption)
  .delete(isAuth, deletePost);

router.route("/posts").get(isAuth, getPostOfFollowing);
router
  .route("/post/comment/:id")
  .put(isAuth, commentOnPost)
  .delete(isAuth, deleteComment);

module.exports = router;
