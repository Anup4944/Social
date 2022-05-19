import React, { useState, useEffect } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Actions/User";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearErrors" });
    }
  }, [error, dispatch, message]);
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleOnSubmit}>
        <Typography
          variant="h4"
          style={{ padding: "2vmax", textAlign: "center", color: "crimson" }}
        >
          G'day! Welcome to my Social App!
        </Typography>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          style={{
            cursor: "pointer",
            marginBottom: "3vmax",
            position: "absolute",
            left: "35vmax",
            top: "26vmax",
          }}
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <Visibility />
          ) : (
            <VisibilityOff onClick={() => setShow(show)} />
          )}
        </Button>

        <Link to="/forget/password">
          <Typography variant="h6">Forget Password </Typography>
        </Link>
        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography variant="h6">Register </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
