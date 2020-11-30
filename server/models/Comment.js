const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parentPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    likes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
