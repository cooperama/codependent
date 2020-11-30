const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // Do I need to reference the codegory here???? IDTS... i don't think so
    codegory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Codegory",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    likes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
