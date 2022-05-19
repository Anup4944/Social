import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction } from "../../Actions/User";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { error, message, isLoading } = useSelector((state) => state.like);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePasswordAction(oldPassword, newPassword));
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
  }, [dispatch, error, message]);
  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={handleOnSubmit}>
        <input
          type={showOld ? "text" : "password"}
          placeholder="Enter your old password"
          required
          className="updatePasswordInputs"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <Button
          style={{
            cursor: "pointer",
            color: "red",
          }}
          onClick={() => {
            setShowOld(!showOld);
          }}
        >
          {showOld ? (
            <label>HIDE PASSWORD</label>
          ) : (
            <label onClick={() => setShowOld(showOld)}>SHOW PASSWORD</label>
          )}
        </Button>
        <input
          type={showNew ? "text" : "password"}
          className="updatePasswordInputs"
          placeholder="Enter your new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button
          style={{
            cursor: "pointer",
            color: "red",
          }}
          onClick={() => {
            setShowNew(!showNew);
          }}
        >
          {showNew ? (
            <label>HIDE PASSWORD</label>
          ) : (
            <label onClick={() => setShowNew(showNew)}>SHOW PASSWORD </label>
          )}
        </Button>

        <Button
          disbaled={isLoading}
          type="submit"
          style={{ marginTop: "10px", border: "1px solid blue" }}
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
