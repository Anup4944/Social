const express = require("express");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//using middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes

const postRoute = require("./routes/post");
const userRoute = require("./routes/user");

//using routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);

module.exports = app;
