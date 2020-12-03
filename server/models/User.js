const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: String,
    photo: String,
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    available: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Availability",
      },
    ],
    paired: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Paired",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
