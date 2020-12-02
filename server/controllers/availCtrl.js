const db = require("../models");

const index = (req, res) => {
  console.log("req.session  ", req.session);
  db.Availability.find({})
    .populate("user")
    .then((userAvail) => {
      res.json({ avail: userAvail });
    })
    .catch((err) => {
      console.log("Error in availablity.index: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getAvail = (req, res) => {
  console.log("req.session  ", req.session);
  db.Availability.findById(req.params.id)
    .populate("user")
    .then((foundAvail) => {
      res.json({ avail: foundAvail });
    })
    .catch((err) => {
      console.log("Error in availablity.getAvail: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updateAvail = (req, res) => {
  console.log("req.session  ", req.session);
  db.Availability.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedAvail) => {
      res.json({ avail: updatedAvail });
    })
    .catch((err) => {
      console.log("Error in availablity.updateAvail: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const create = (req, res) => {
  console.log("req.session  ", req.session);
  db.Availability.create(req.body)
    .then((newAvail) => {
      res.json({ avail: newAvail });
    })
    .catch((err) => {
      console.log("Error in avail.create: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deleteAvail = (req, res) => {
  console.log("req.session  ", req.session);
  db.Availability.findByIdAndDelete(req.params.id)
    .then((deletedAvail) => {
      res.json({ avail: deletedAvail });
    })
    .catch((err) => {
      console.log("Error in avail.deleteAvail: ", err);
      res.json({ error: "Unable to get data" });
    });
};

module.exports = {
  index,
  getAvail,
  updateAvail,
  create,
  deleteAvail,
};
