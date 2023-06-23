import React, { useState, useEffect } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../Actions/User";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();

  const { error, isLoading } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      toast(`${error}`, {
        duration: 4000,
        position: "top-center",
        icon: "⚠️",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
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
        <Toaster position="top-center" reverseOrder={false} />
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
          type={showLogin ? "text" : "password"}
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
            setShowLogin(!showLogin);
          }}
        >
          {showLogin ? (
            <label>HIDE PASSWORD</label>
          ) : (
            <label onClick={() => setShowLogin(showLogin)}>VIEW PASSWORD</label>
          )}
        </Button>

        <Link to="/forget/password">
          <Typography variant="h6">Forget Password?</Typography>
        </Link>
        <Button
          type="submit"
          style={{
            border: "1px solid blue",
            backgroundColor: "rgb(38, 63, 173)",
            color: "white",
          }}
          disabled={isLoading}
        >
          Login
        </Button>

        <Link to="/register">
          <Typography variant="h6">New here? Register now </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
