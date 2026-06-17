import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followAndUnfollowAction,
  getUserPostAction,
  getUserProfileAction,
} from "../../Actions/User";
import Loader from "../../component/loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import User from "../User/User";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const UserProfile = () => {
  const dispatch = useDispatch();

  const [followersTogg, setFollowersTogg] = useState(false);

  const [followingTogg, setFollowingTogg] = useState(false);

  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const { id } = useParams();

  const {
    error: followError,
    message,
    isLoading: followLoading,
  } = useSelector((state) => state.like);

  const { isLoading, error, posts } = useSelector((state) => state.userPosts);

  const {
    user,
    isLoading: userLoading,
    error: userProfError,
  } = useSelector((state) => state.userProfile);

  const { user: myself } = useSelector((state) => state.user);

  const handleOnFollow = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowAction(id));
    dispatch(getUserProfileAction(id));
  };

  useEffect(() => {
    dispatch(getUserPostAction(id));
    dispatch(getUserProfileAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    setMyProfile(myself._id === id);
    if (user) {
      setFollowing(user.followers.some((item) => item._id === myself._id));
    }
  }, [user, id, myself._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      toast.error(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userProfError) {
      toast.error(userProfError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      toast(`${message}`, {
        duration: 4000,
        position: "top-center",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch, followError, userProfError]);
  return isLoading === true || userLoading ? (
    <Loader />
  ) : (
    <div className="account">
      <Toaster />
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
              createdAt={post.createdAt}
              isHomePage={true}
              userId={id}
            />
          ))
        ) : (
          <Typography variant="h6">User have no post yet</Typography>
        )}
      </div>

      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{user.name}</Typography>

            <div className="statsBox">
              <div className="statItem">
                <button onClick={() => setFollowersTogg(!followersTogg)}>
                  <Typography variant="h6" fontWeight={700}>{user.followers.length}</Typography>
                  <Typography variant="caption">Followers</Typography>
                </button>
              </div>
              <div className="statDivider" />
              <div className="statItem">
                <button onClick={() => setFollowingTogg(!followingTogg)}>
                  <Typography variant="h6" fontWeight={700}>{user.following.length}</Typography>
                  <Typography variant="caption">Following</Typography>
                </button>
              </div>
              <div className="statDivider" />
              <div className="statItem">
                <Typography variant="h6" fontWeight={700}>{user.posts.length}</Typography>
                <Typography variant="caption">Posts</Typography>
              </div>
            </div>

            {myProfile ? null : (
              <Button
                style={{ background: following ? "red" : "green" }}
                variant="contained"
                onClick={handleOnFollow}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

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
                Not following anyone yet
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
