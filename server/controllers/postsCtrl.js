const db = require("../models");

const allPosts = (req, res) => {
  console.log("req.session  ", req.session);
  db.Post.find({})
    .then((foundPosts) => {
      res.json({ posts: foundPosts });
    })
    .catch((err) => {
      console.log("Error in Post.allPosts: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getPost = (req, res) => {
  console.log("req.session  ", req.session);
  db.Post.findById(req.params.id)
    .populate("author comments")
    .then((foundPost) => {
      res.json({ post: foundPost });
    })
    .catch((err) => {
      console.log("Error in Post.getPost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const createPost = (req, res) => {
  console.log("req.session  ", req.session);
  db.Post.create(req.body)
    .then((newPost) => {
      res.json({ post: newPost });
    })
    .catch((err) => {
      console.log("Error in Post.createPost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updatePost = (req, res) => {
  console.log("req.session  ", req.session);
  db.Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPost) => {
      res.json({ post: updatedPost });
    })
    .catch((err) => {
      console.log("Error in Post.updatePost: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deletePost = (req, res) => {
  console.log("req.session  ", req.session);
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
  deletePost,
};
