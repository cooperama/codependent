const db = require("../models");

const allPosts = (req, res) => {
  db.Post.find({})
    .then((foundPosts) => {
      res.json({ posts: foundPosts });
    })
    .catch((err) => {
      console.log("Error in Post.allPosts: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const recentPosts = (req, res) => {
  db.Post.find({})
    .sort({ createdAt: -1 })
    // .limit(5)
    // .populate({ path: "posts", populate: { path: "author comments codegory" } })
    .populate("codegory")
    .populate("author")
    .populate("comments")
    .then((foundPosts) => {
      res.json({ posts: foundPosts });
    })
    .catch((err) => {
      console.log("Error in Post.allPosts: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getPost = (req, res) => {
  db.Post.findById(req.params.id)
    .populate("codegory")
    .populate("author")
    .populate("comments")
    // .populate("author comments codegory") // thought I could populate multiple like this, but seems like no.
    .then((foundPost) => {
      res.json({ post: foundPost });
    })
    .catch((err) => {
      console.log("Error in Post.getPost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const createPost = (req, res) => {
  db.Post.create(req.body)
    .then((newPost) => {
      res.json({ post: newPost });
      // Need to push into Codgeory & User
      db.User.findById(req.body.author).then((data) => {
        data.posts.push(newPost._id);
        data.save();
        console.log("user in post.create: ", data);
        db.Codegory.findById(req.body.codegory).then((data) => {
          data.posts.push(newPost._id);
          data.save();
          console.log("codegory in post.create: ", data);
        });
      });
    })
    .catch((err) => {
      console.log("Error in Post.createPost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updatePost = (req, res) => {
  db.Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPost) => {
      console.log("updated updatedPost in comm ctrl: ", updatedPost);
      res.json({ post: updatedPost });
    })
    .catch((err) => {
      console.log("Error in Post.updatePost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deletePost = (req, res) => {
  db.Post.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
      res.json({ post: deletedPost });
    })
    .catch((err) => {
      console.log("Error in Post.deletePost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

module.exports = {
  allPosts,
  getPost,
  createPost,
  updatePost,
  recentPosts,
  deletePost,
};
