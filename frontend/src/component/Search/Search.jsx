import React, { useState } from "react";
import "./Search.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import User from "../User/User";
import { getAllUsersAction } from "../../Actions/User";

const Search = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const { users, isLoading } = useSelector((state) => state.allUsers);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsersAction(name));
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={handleOnSubmit}>
        <Typography
          variant="h4"
          style={{ padding: "2vmax", textAlign: "center" }}
        >
          Search profile
        </Typography>

        <input
          type="text"
          placeholder="Enter user name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={isLoading} type="submit">
          Search
        </Button>

        <div className="searchResuls">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
