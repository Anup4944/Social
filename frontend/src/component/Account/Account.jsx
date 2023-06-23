import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfileAction,
  getMyPostAction,
  loadUserAction,
  logoutUserAction,
} from "../../Actions/User";
import Loader from "../../component/loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import "./Account.css";
import { Link } from "react-router-dom";
import User from "../User/User";
import { toast } from "react-hot-toast";

const Account = () => {
  const dispatch = useDispatch();

  const [followersTogg, setFollowersTogg] = useState(false);

  const [followingTogg, setFollowingTogg] = useState(false);

  const {
    error: likeError,
    message,
    isLoading: deleteLoading,
  } = useSelector((state) => state.like);

  const { isLoading, error, posts } = useSelector((state) => state.myPosts);

  const { user, isLoading: userLoading } = useSelector((state) => state.user);

  const handleOnLogout = async () => {
    await dispatch(logoutUserAction());
    toast("Logout success", {
      duration: 4000,
      position: "top-center",
      style: {},
      className: "",
      icon: "👋 ",
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    });
  };

  const deleteProfile = async () => {
    await dispatch(deleteProfileAction());
    dispatch(logoutUserAction());
  };
  useEffect(() => {
    dispatch(getMyPostAction());
    dispatch(loadUserAction());
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
      toast(`${message}`, {
        duration: 4000,
        position: "top-center",
        style: {},
        className: "",
        icon: "👏",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });

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
              ownerImages={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
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
          <button onClick={() => setFollowersTogg(!followersTogg)}>
            <Typography variant="h6">Followers</Typography>
          </button>

          <Typography variant="h7">{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setFollowingTogg(!followingTogg)}>
            <Typography variant="h6">Following</Typography>
          </button>

          <Typography>{user.following.length}</Typography>
        </div>
        <div>
          <Typography>Posts</Typography>

          <Typography>{user.posts.length}</Typography>
        </div>

        <Button
          variant="contained"
          style={{ cursor: "pointer" }}
          onClick={handleOnLogout}
        >
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfile}
          disabled={deleteLoading}
        >
          Delete profile
        </Button>

        <Dialog
          open={followersTogg}
          onClose={() => setFollowersTogg(!followersTogg)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  name={item.name}
                  avatar={item.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingTogg}
          onClose={() => setFollowingTogg(!followingTogg)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((item) => (
                <User
                  key={item._id}
                  userId={item._id}
                  name={item.name}
                  avatar={item.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
