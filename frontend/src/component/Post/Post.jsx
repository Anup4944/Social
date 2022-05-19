import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentPostAction,
  deletePostAction,
  likePost,
  updatePostAction,
} from "../../Actions/Posts";
import {
  getFollowingPostAction,
  getMyPostAction,
  getUserPostAction,
  loadUserAction,
} from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../commentCard/CommentCard";

const Post = ({
  postId,
  caption,
  postImages,
  likes = [],
  comments = [],
  ownerImages,
  ownerId,
  ownerName,
  isDelete = false,
  isAccount = false,
  isHomePage = false,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const [viewLike, setViewLike] = useState(false);

  const [commentValue, setCommentValue] = useState("");
  const [commentToogle, setCommentToogle] = useState(false);

  const [updateToogle, setUpdateToogle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handleOnClick = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPostAction());
    } else {
      dispatch(getFollowingPostAction());
    }

    if (isHomePage) {
      dispatch(getUserPostAction(userId));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addCommentPostAction(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPostAction());
    } else {
      dispatch(getFollowingPostAction());
    }

    if (isHomePage) {
      dispatch(getUserPostAction(userId));
    }
  };

  const handleOnUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePostAction(captionValue, postId));
    dispatch(getMyPostAction());
  };

  const deletePost = async () => {
    await dispatch(deletePostAction(postId));
    dispatch(getMyPostAction());
    dispatch(loadUserAction());

    if (isHomePage) {
      dispatch(getUserPostAction(userId));
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setUpdateToogle(!updateToogle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <img src={postImages} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImages}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={500}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        onClick={() => setViewLike(!viewLike)}
        disabled={likes.length === 0 ? true : false}
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        {" "}
        <Typography>{likes.length} likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleOnClick}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button>
          <ChatBubbleOutline onClick={() => setCommentToogle(!commentToogle)} />
          <Typography
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
              margin: "1vmax 2vmax",
            }}
          >
            {comments.length} comments
          </Typography>
        </Button>

        {isDelete ? (
          <Button onClick={deletePost}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
      <Dialog open={viewLike} onClose={() => setViewLike(!viewLike)}>
        <div className="DialogBox">
          <Typography varient="h4"> Liked by</Typography>
          {likes.map((item) => (
            <User
              key={item._id}
              userId={item._id}
              name={item.name}
              avatar={item.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToogle}
        onClose={() => setCommentToogle(!commentToogle)}
      >
        <div className="DialogBox">
          <Typography varient="h4"> Comments</Typography>
          <form className="commentForm" onSubmit={handleOnSubmit}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment here"
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments && comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No comments yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={updateToogle}
        onClose={() => setUpdateToogle(!updateToogle)}
      >
        <div className="DialogBox">
          <Typography varient="h4"> Update caption</Typography>
          <form className="commentForm" onSubmit={handleOnUpdate}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              placeholder="Caption here"
              required
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
