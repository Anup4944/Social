import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../Actions/User";
import { useParams, Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPass, setNewPass] = useState("");

  const dispatch = useDispatch();

  const { token } = useParams();

  const { error, message, isLoading } = useSelector((state) => state.like);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(token, newPass));
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
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={handleOnSubmit}>
        <input
          type="password"
          className="resetPasswordInputs"
          placeholder="Enter your new password"
          required
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />{" "}
        <Link to="/forget/password">
          {" "}
          <Typography>Request another token </Typography>
        </Link>{" "}
        <Link to="/">
          {" "}
          <Typography>Back to login </Typography>
        </Link>{" "}
        <Button disabled={isLoading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
