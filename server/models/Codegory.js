const mongoose = require("mongoose");

const CodegorySchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("Codegory", CodegorySchema);
