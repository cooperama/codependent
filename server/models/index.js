const mongoose = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/codedependent";

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected~~"))
  .catch((err) => console.log("MongoDB connection error: ", err));

module.exports = {
  User: require("./User"),
  Codegory: require("./Codegory"),
  Comment: require("./Comment"),
  Post: require("./Post"),
  Availability: require("./Availability"),
  Paired: require("./Paired"),
};
