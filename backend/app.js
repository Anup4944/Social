const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//using middleware
app.use(cookieParser());
app.use(
  cors({
    credentials: true, //included credentials as true
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//import routes

const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//using routes

// app.use("/", (req, res) => {
//   res.send("Backend API for Social App");
// });

app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
