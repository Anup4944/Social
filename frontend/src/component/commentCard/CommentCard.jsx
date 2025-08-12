import React from "react";
import "./commentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentPostAction } from "../../Actions/Posts";
import { getFollowingPostAction, getMyPostAction } from "../../Actions/User";

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
      dispatch(getMyPostAction());
    } else {
      dispatch(getFollowingPostAction());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`} className="commentUser__link">
        <img src={avatar} alt={name} className="commentUser__avatar" />
        <Typography className="commentUser__name">{name}</Typography>
      </Link>

      <Typography className="commentUser__text">{comment}</Typography>

      {(isAccount || userId === user._id) && (
        <Button
          onClick={handleOnDelete}
          className="commentUser__delete"
          aria-label="Delete comment"
        >
          <Delete />
        </Button>
      )}
    </div>
  );
};

export default CommentCard;
