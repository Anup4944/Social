import React, { useState } from "react";
import "./commentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete, Edit, Check, Close } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { addCommentPostAction, deleteCommentPostAction } from "../../Actions/Posts";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  refreshPosts,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment);

  const isOwner = userId === user._id;

  const handleOnDelete = async () => {
    await dispatch(deleteCommentPostAction(postId, commentId));
    if (refreshPosts) refreshPosts();
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    await dispatch(addCommentPostAction(postId, editValue));
    setIsEditing(false);
    if (refreshPosts) refreshPosts();
  };

  const handleEditCancel = () => {
    setEditValue(comment);
    setIsEditing(false);
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`} className="commentUser__link">
        <img src={avatar} alt={name} className="commentUser__avatar" />
        <Typography className="commentUser__name">{name}</Typography>
      </Link>

      {isEditing ? (
        <form className="commentUser__editForm" onSubmit={handleEditSave}>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            required
          />
          <Button type="submit" size="small" aria-label="Save comment">
            <Check fontSize="small" />
          </Button>
          <Button size="small" onClick={handleEditCancel} aria-label="Cancel edit">
            <Close fontSize="small" />
          </Button>
        </form>
      ) : (
        <Typography className="commentUser__text">{comment}</Typography>
      )}

      {isOwner && !isEditing && (
        <div className="commentUser__actions">
          <Button
            onClick={() => setIsEditing(true)}
            className="commentUser__edit"
            aria-label="Edit comment"
            size="small"
          >
            <Edit fontSize="small" />
          </Button>
          <Button
            onClick={handleOnDelete}
            className="commentUser__delete"
            aria-label="Delete comment"
            size="small"
          >
            <Delete fontSize="small" />
          </Button>
        </div>
      )}

      {(isAccount && !isOwner) && (
        <Button
          onClick={handleOnDelete}
          className="commentUser__delete"
          aria-label="Delete comment"
          size="small"
        >
          <Delete fontSize="small" />
        </Button>
      )}
    </div>
  );
};

export default CommentCard;
