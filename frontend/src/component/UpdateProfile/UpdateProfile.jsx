import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, updateProfileAction } from "../../Actions/User";
import Loader from "../loader/Loader";

const UpdateProfile = () => {
  const { isLoading, error, user } = useSelector((state) => state.user);
  const {
    isLoading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvataPrevr] = useState(user.avatar.url);
  const dispatch = useDispatch();

  const handleOnRegSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfileAction(name, email, avatar));
    dispatch(loadUserAction());
  };

  const handleOnImgChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvataPrevr(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, updateError, message]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={handleOnRegSubmit}>
        <Typography
          variant="h4"
          style={{ padding: "2vmax", textAlign: "center" }}
        >
          Update your account
        </Typography>

        <Avatar
          src={avatarPrev}
          alt="user"
          sx={{
            height: "10vmax ",
            width: "10vmax",
          }}
        />

        <input type="file" accept="image/*" onChange={handleOnImgChange} />
        <input
          type="text"
          placeholder="Enter your name"
          required
          className="updateProfileInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={updateLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
