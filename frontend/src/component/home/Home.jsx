import React, { useEffect } from "react";
import User from "../User/User";
import "./Home.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPostAction, getAllUsersAction } from "../../Actions/User";
import Loader from "../loader/Loader";
import { Typography } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();

  const { isLoading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, isLoading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  const { error: likeError, message } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getFollowingPostAction());
    dispatch(getAllUsersAction());
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
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
      dispatch({ type: "clearMessage" });
      dispatch(getAllUsersAction());
    }
  }, [error, message, dispatch, likeError]);
  return isLoading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <Toaster />
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((item) => (
            <Post
              key={item._id}
              postId={item._id}
              caption={item.caption}
              postImages={item.image.url}
              likes={item.likes}
              comments={item.comments}
              ownerImages={item.owner.avatar.url}
              ownerName={item.owner.name}
              ownerId={item.owner._id}
            />
          ))
        ) : (
          <Typography>
            Please follow other users to view their posts.{" "}
          </Typography>
        )}
      </div>
      <div className="homeright">
        <Typography
          variant="h6"
          fontWeight={500}
          color="rgba(0,0,0,0.582)"
          style={{ textAlign: "center" }}
        >
          Follow users
        </Typography>

        {users && users.length > 0 ? (
          users.map((item) => (
            <User
              key={item._id}
              userId={item._id}
              name={item.name}
              avatar={item.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h6">No users</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
