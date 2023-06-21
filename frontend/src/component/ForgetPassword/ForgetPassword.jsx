import React, { useState, useEffect } from "react";
import "./ForgetPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../Actions/User";
import { Link } from "react-router-dom";

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
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearErrors" });
    }
  }, [message, error, dispatch]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={handleOnSubmit}>
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
        <Link to="/">Back</Link>
      </form>
    </div>
  );
};

export default ForgetPassword;
