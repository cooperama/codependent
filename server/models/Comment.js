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
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // Not sure if I need these???!!!??? Since they point to the Comment themselves
    parentPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    likes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
