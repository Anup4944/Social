import React, { useState, useEffect } from "react";
import "./Register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../Actions/User";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  const handleOnRegSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAction(name, email, avatar, password));
  };

  const handleOnImgChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleOnRegSubmit}>
        <Typography
          variant="h4"
          style={{ padding: "2vmax", textAlign: "center" }}
        >
          Register your account today and experience the best social network!
        </Typography>

        <Avatar
          src={avatar}
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
          className="registerInputs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={show ? "text" : "password"}
          className="registerInputs"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <label> HIDE</label>
          ) : (
            <label onClick={() => setShow(show)}>SHOW</label>
          )}
        </Button>
        <Link to="/">
          <Typography>Already Signed up? Login now </Typography>
        </Link>

        <Button
          disabled={isLoading}
          type="submit"
          style={{
            border: "1px solid blue",
            backgroundColor: "rgb(38, 63, 173)",
            color: "white",
          }}
        >
          Sign Up
        </Button>
        <Button disabled={isLoading} style={{ marginTop: "1rem" }}>
          <Link to="/">Back</Link>
        </Button>
      </form>
    </div>
  );
};

export default Register;
