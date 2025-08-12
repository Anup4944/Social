import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  const { user: currentUser } = useSelector((state) => state.user);
  console.log(currentUser?.avatar.url);

  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      {/* <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link> */}
      <Link to="/account" onClick={() => setTab("/account")}>
        <Avatar
          src={currentUser?.avatar.url}
          sx={{ height: "2vmax", width: "2vmax" }}
        />
      </Link>
    </div>
  );
};

export default Header;
