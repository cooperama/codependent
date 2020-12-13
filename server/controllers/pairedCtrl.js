const db = require("../models");

// Email Function
const requestPartner = require("../nodemailer");

const index = (req, res) => {
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
  db.Paired.findById(req.params.id)
    .then((foundPaired) => {
      res.json({ Paired: foundPaired });
    })
    .catch((err) => {
      console.log("Error in Pairedablity.getPaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

// Only the requesting user can create a pairing
const createPaired = (req, res) => {
  db.Paired.create(req.body)
    .then((newPaired) => {
      // Add paired doc to requester
      db.User.findById(newPaired.requestingUser).then((foundUser) => {
        foundUser.paired.push(newPaired._id);
        foundUser.save();
        // Add paired doc to requestee
        db.User.findById(newPaired.respondingUser).then((foundUser) => {
          foundUser.paired.push(newPaired._id);
          foundUser.save();
          res.json({ paired: newPaired });
        });
      });
    })
    .catch((err) => {
      console.log("Error in Paired.createPaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

// Responding user finds paired doc, changes paired prop to true
const updatePaired = (req, res) => {
  db.Paired.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedPaired) => {
      res.json({ Paired: updatedPaired });
    })
    .catch((err) => {
      console.log("Error in Pairedablity.updatePaired: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const sendRequest = (req, res) => {
  requestPartner(req.body.recipientEmail, req.body.emailBody);
  res.json({ request: "sent" });
};

const deletePaired = (req, res) => {
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
