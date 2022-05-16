import { Avatar, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { likePost } from "../../Actions/Posts";

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
}) => {
  const [liked, setLikes] = useState(false);

  const dispatch = useDispatch();

  const handleOnClick = (e) => {
    setLikes(!liked);
    dispatch(likePost(postId));
  };
  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button>
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
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        {" "}
        <Typography>5 likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handleOnClick}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
