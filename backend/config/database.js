const mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_LOCAL)
    .then((con) =>
      console.log(`Database connection sucessfull ${con.connection.host}`)
    )
    .catch((err) => console.log(err));
};
