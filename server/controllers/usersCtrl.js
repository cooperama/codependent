const bcrypt = require("bcryptjs");
const db = require("../models");

const login = (req, res) => {
  req.session.username = req.body.username;
  req.session.logged = true;
  console.log("session on login: ", req.session);
  db.User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.json({ error: "Unable to get data" });
      return console.log(err);
    }
    if (!user) return console.log("no user found");

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return console.log("error with passwords");
      if (isMatch) {
        req.session.currentUser = user._id;
        res.json({ user: user });
      }
    });
  });
};

const signup = (req, res) => {
  console.log(req.body);
  db.User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return console.log("user already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log("error generating salt");

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log("err hasing password");

        const newUser = {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        };

        db.User.create(newUser)
          .then((newUser) => {
            res.json({ users: newUser });
          })
          .catch((err) => {
            console.log("Error in users.signup: ", err);
            res.json({ error: "Unable to get data from signup user.create" });
          });
      });
    });
  });
};

const allUsers = (req, res) => {
  db.User.find({})
    .then((foundUsers) => {
      res.json({ users: foundUsers });
    })
    .catch((err) => {
      console.log("Error in users.allUsers: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const getUser = (req, res) => {
  if (req.session.logged) {
    console.log("req session logged true");
  }
  console.log(req.params);
  console.log("sessions? ", req.session);
  db.User.findById(req.params.id)
    .populate("available")
    .then((foundUser) => {
      res.json({ user: foundUser });
    })
    .catch((err) => {
      console.log("Error in users.getUser: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updateUser = (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      res.json({ user: updatedUser });
    })
    .catch((err) => {
      console.log("Error in users.updateUser: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const deleteUser = (req, res) => {
  db.User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      res.json({ users: deletedUser });
    })
    .catch((err) => {
      console.log("Error in users.deleteUser: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const logout = (req, res) => {
  console.log("users ctrl");
  console.log(req.session);
  if (req.session.currentUser) {
    req.session.destroy((err) => {
      if (err) return console.log("error destroying session");
    });
  }
};

module.exports = {
  login,
  logout,
  signup,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
};
