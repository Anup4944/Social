import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPostAction, getUserProfileAction } from "../../Actions/User";
import Loader from "../../component/loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import User from "../User/User";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();

  const [followersTogg, setFollowersTogg] = useState(false);

  const [followingTogg, setFollowingTogg] = useState(false);

  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const { id } = useParams();

  const { error: likeError, message } = useSelector((state) => state.like);

  const { isLoading, error, posts } = useSelector((state) => state.userPosts);

  const { user, isLoading: userLoading } = useSelector(
    (state) => state.userProfile
  );

  const { user: myself } = useSelector((state) => state.user);

  const handleOnFollow = () => {
    setFollowing(!following);
  };

  useEffect(() => {
    dispatch(getUserPostAction(id));
    dispatch(getUserProfileAction(id));

    if (myself._id === id) {
      setMyProfile(true);
    }
  }, [dispatch, id, myself._id]);

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
              ownerImages={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
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

            <div>
              <button onClick={() => setFollowersTogg(!followersTogg)}>
                <Typography>Followers</Typography>
              </button>

              <Typography>{user.followers.length}</Typography>
            </div>
            <div>
              <button onClick={() => setFollowingTogg(!followingTogg)}>
                <Typography>Following</Typography>
              </button>

              <Typography>{user.following.length}</Typography>
            </div>
            <div>
              <Typography>Posts</Typography>

              <Typography>{user.posts.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                style={{ background: following ? "red" : "green" }}
                variant="contained"
                onClick={handleOnFollow}
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
      </div>
    </div>
  );
};

export default UserProfile;
