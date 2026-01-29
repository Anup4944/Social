const app = require("./app.js");
const { connectDatabase } = require("./config/database.js");
const cloudinary = require("cloudinary");

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/debug-env", (req, res) => {
  res.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "MISSING",
    api_key_exists: !!process.env.CLOUDINARY_API_KEY,
    api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
    all_cloudinary_vars: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? "EXISTS" : "MISSING",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        ? "EXISTS"
        : "MISSING",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
