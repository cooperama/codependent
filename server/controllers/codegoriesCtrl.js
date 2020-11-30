const db = require("../models");

const allCodegories = (req, res) => {
  db.Codegory.find({})
    .then((foundCodegories) => {
      res.json({ codegories: foundCodegories });
    })
    .catch((err) => {
      console.log("Error in Codegory.allCodegories: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getCodegory = (req, res) => {
  db.Codegory.findById(req.params.id)
    .populate("posts")
    .then((foundCodegory) => {
      res.json({ codegory: foundCodegory });
    })
    .catch((err) => {
      console.log("Error in Codegory.getCodegory: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const createCodegory = (req, res) => {
  db.Codegory.create(req.body)
    .then((newCodegory) => {
      res.json({ codegory: newCodegory });
    })
    .catch((err) => {
      console.log("Error in Codegory.createCodegory: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updateCodegory = (req, res) => {
  db.Codegory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCodegory) => {
      res.json({ codegory: updatedCodegory });
    })
    .catch((err) => {
      console.log("Error in Codegory.updateCodegory: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deleteCodegory = (req, res) => {
  db.Codegory.findByIdAndDelete(req.params.id)
    .then((deletedCodegory) => {
      res.json({ codegory: deletedCodegory });
    })
    .catch((err) => {
      console.log("Error in Codegory.deleteCodegory: ", err);
      res.json({ error: "Unable to get data" });
    });
};

module.exports = {
  allCodegories,
  getCodegory,
  createCodegory,
  updateCodegory,
  deleteCodegory,
};
