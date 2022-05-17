import React, { useState, useEffect } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Actions/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.user);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }
  }, [error, dispatch]);
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
