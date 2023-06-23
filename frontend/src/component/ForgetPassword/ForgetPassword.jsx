import React, { useState, useEffect } from "react";
import "./ForgetPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../Actions/User";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, message, isLoading } = useSelector((state) => state.like);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPasswordAction(email));
  };

  useEffect(() => {
    if (error) {
      toast(`${error}`, {
        duration: 4000,
        position: "top-center",
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
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
      dispatch({ type: "clearErrors" });
    }
  }, [message, error, dispatch]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={handleOnSubmit}>
        <Toaster />
        <Typography
          variant="h6"
          style={{ padding: "2vmax", textAlign: "center", color: "crimson" }}
        >
          Forgot Password? No worries, we can fix that easily!
        </Typography>
        <input
          className="forgotPasswordInputs"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button disabled={isLoading} type="submit">
          Send Token
        </Button>
        <Button disabled={isLoading}>
          <Link to="/">Back</Link>
        </Button>
      </form>
    </div>
  );
};

export default ForgetPassword;
