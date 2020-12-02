const db = require("../models");

const index = (req, res) => {
  console.log("req.session  ", req.session);
  db.Paired.find({})
    .then((userPaired) => {
      res.json({ Paired: userPaired });
    })
    .catch((err) => {
      console.log("Error in Pairedablity.index: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getPaired = (req, res) => {
  console.log("req.session  ", req.session);
  db.Paired.findById(req.params.id)
    .then((foundPaired) => {
      res.json({ Paired: foundPaired });
    })
    .catch((err) => {
      console.log("Error in Pairedablity.getPaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updatePaired = (req, res) => {
  console.log("req.session  ", req.session);
  db.Paired.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPaired) => {
      res.json({ Paired: updatedPaired });
    })
    .catch((err) => {
      console.log("Error in Pairedablity.updatePaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const createPaired = (req, res) => {
  console.log("req.session  ", req.session);
  db.Paired.create(req.body)
    .then((newPaired) => {
      res.json({ Paired: newPaired });
    })
    .catch((err) => {
      console.log("Error in Paired.createPaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const sendRequest = (req, res) => {
  console.log("req.session  ", req.session);
  res.json({ paired: "paired?" });
};

const deletePaired = (req, res) => {
  console.log("req.session  ", req.session);
  db.Paired.findByIdAndDelete(req.params.id)
    .then((deletedPaired) => {
      res.json({ Paired: deletedPaired });
    })
    .catch((err) => {
      console.log("Error in Paired.delete: ", err);
      res.json({ error: "Unable to get data" });
    });
};

module.exports = {
  index,
  getPaired,
  updatePaired,
  sendRequest,
  createPaired,
  deletePaired,
};
