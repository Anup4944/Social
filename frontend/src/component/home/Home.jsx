import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../Post/Post";
import User from "../User/User";
import NewPost from "../newPost/NewPost";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPostAction, getAllUsersAction } from "../../Actions/User";
import Loader from "../loader/Loader";
import { Typography, Button } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");

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
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      toast.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast(`${message}`, {
        duration: 4000,
        position: "top-center",
        icon: "👏",
        iconTheme: { primary: "#000", secondary: "#fff" },
      });
      dispatch({ type: "clearMessage" });
      dispatch(getAllUsersAction());
      dispatch(getFollowingPostAction());
    }
  }, [error, message, dispatch, likeError]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersAction(searchName));
  };

  return isLoading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <Toaster />
      <div className="homeleft">
        <NewPost inline={true} />

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
          <Typography style={{ color: "white", marginTop: "2vmax" }}>
            Please follow other users to view their posts.
          </Typography>
        )}
      </div>
      <div className="homeright">
        <form className="homeSearch" onSubmit={handleSearchSubmit}>
          <Typography
            variant="h6"
            fontWeight={600}
            style={{ marginBottom: "1vmax", textAlign: "center" }}
          >
            Find People
          </Typography>
          <div className="homeSearchBar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button type="submit" size="small" variant="contained">
              Go
            </Button>
          </div>
        </form>

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
          <Typography
            variant="body2"
            style={{ textAlign: "center", marginTop: "1vmax" }}
          >
            No users found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
