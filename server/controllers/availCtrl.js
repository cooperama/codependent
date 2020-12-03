const db = require("../models");

const index = (req, res) => {
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
  db.Availability.create(req.body)
    .then((newAvail) => {
      // push into user avail array
      console.log("new in avail : ", newAvail);
      db.User.findById(newAvail.user).then((foundUser) => {
        foundUser.available.push(newAvail._id);
        foundUser.save();
        console.log("saved user: ", foundUser);
        res.json({ avail: newAvail });
      });
    })
    .catch((err) => {
      console.log("Error in avail.create: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deleteAvail = (req, res) => {
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
