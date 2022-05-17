import React, { useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Actions/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };
  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleOnSubmit}>
        <Typography
          variant="h4"
          style={{ padding: "2vmax", textAlign: "center" }}
        >
          Welcome to my Social App!
        </Typography>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
