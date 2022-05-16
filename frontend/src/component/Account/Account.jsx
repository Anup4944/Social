import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPostAction } from "../../Actions/User";
import Loader from "../../component/loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Typography } from "@mui/material";
import "./Account.css";
import { Link } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const { error: likeError, message } = useSelector((state) => state.like);

  const { isLoading, error, posts } = useSelector((state) => state.myPosts);
  const { user, isLoading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMyPostAction());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, likeError]);
  return isLoading === true || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImages={post.image.url}
              likes={post.likes}
              comments={post.comments}
              // ownerImages={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">You have no post yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>
        <div>
          <button>
            <Typography>Followers</Typography>
          </button>

          <Typography>{user.followers.length}</Typography>
        </div>
        <div>
          <button>
            <Typography>Following</Typography>
          </button>

          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>

          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" style={{ cursor: "pointer" }}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change password</Link>

        <Button variant="text" style={{ color: "red", margin: "2vmax" }}>
          Delete profile
        </Button>
      </div>
    </div>
  );
};

export default Account;
