const db = require("../models");

const allComments = (req, res) => {
  db.Comment.find({})
    .then((foundComments) => {
      res.json({ comments: foundComments });
    })
    .catch((err) => {
      console.log("Error in Comment.allComments: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getComment = (req, res) => {
  db.Comment.findById(req.params.id)
    .populate("author replies")
    .then((foundComment) => {
      res.json({ comment: foundComment });
    })
    .catch((err) => {
      console.log("Error in Comment.getComment: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const createComment = (req, res) => {
  db.Comment.create(req.body)
    .then((newComment) => {
      res.json({ comment: newComment });
    })
    .catch((err) => {
      console.log("Error in Comment.createComment: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updateComment = (req, res) => {
  db.Comment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedComment) => {
      res.json({ comment: updatedComment });
    })
    .catch((err) => {
      console.log("Error in Comment.updateComment: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deleteComment = (req, res) => {
  db.Comment.findByIdAndDelete(req.params.id)
    .then((deletedComment) => {
      res.json({ comment: deletedComment });
    })
    .catch((err) => {
      console.log("Error in Comment.deleteComment: ", err);
      res.json({ error: "Unable to get data" });
    });
};

module.exports = {
  allComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
