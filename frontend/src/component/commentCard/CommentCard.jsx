import React from "react";
import "./commentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentPostAction } from "../../Actions/Posts";
import { getFollowingPostAction } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleOnDelete = async () => {
    await dispatch(deleteCommentPostAction(postId, commentId));

    if (isAccount) {
      console.log("Find your post here");
    } else {
      dispatch(getFollowingPostAction());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>

      <Typography>{comment}</Typography>

      {isAccount ? (
        <Button onClick={handleOnDelete}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={handleOnDelete}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
