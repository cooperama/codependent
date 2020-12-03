const bcrypt = require("bcryptjs");
const db = require("../models");

const login = (req, res) => {
  // console.log("req.session  ", req.session);
  // req.session.username = req.body.username;
  // req.session.logged = true;
  // //
  // req.session.cookie.username = req.body.username;
  // req.session.cookie.logged = true;

  // console.log("session on login: ", req.session);
  // db.User.findOne({ email: req.body.email }, (err, user) => {
  //   if (err) {
  //     res.json({ error: "Unable to get data" });
  //     return console.log(err);
  //   }
  //   if (!user) return console.log("no user found");
  //   return res.json({ user: user });

  //   //   bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
  //   //     if (err) return console.log("error with passwords");
  //   //     if (isMatch) {
  //   //       req.session.currentUser = user._id;
  //   //       console.log("req session from user login controller", req.session);
  //   //       res.json({ user: user });
  //   //     }
  //   //   });
  // });
  // !!!!!!!!!!!!!!!! been using this \/\/
  db.User.findOne({ email: req.body.email })
    .populate("posts")
    .populate("comments")
    .populate("available")
    .populate("paired")
    .then((user) => {
      if (!user) return console.log("no user found");
      return res.json({ user: user });
    })
    .catch((err) => console.log("error in user log in: ", err));
  // !!!!!!!!!!!!!!!! been using this ^^^
};

const signup = (req, res) => {
  // !!!!!!!!!!!!!!!! been using this \/\/
  db.User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return console.log("user already exists");
    }
    // !!!!!!!!!!!!!!!! been using this ^^^

    // bcrypt.genSalt(10, (err, salt) => {
    //   if (err) return console.log("error generating salt");

    //   bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
    //     if (err) return console.log("err hasing password");

    // !!!!!!!!!!!!!!!! been using this \/\/
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      // password: hashedPassword,
    };

    db.User.create(newUser)
      .then((newUser) => {
        res.json({ users: newUser });
      })
      .catch((err) => {
        console.log("Error in users.signup: ", err);
        res.json({ error: "Unable to get data from signup user.create" });
      });
    //   });
    // });
  });
};

const allUsers = (req, res) => {
  // console.log("req.session  ", req.session);
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
  // console.log("req.session  ", req.session);
  // if (req.session.logged) {
  //   console.log("req session logged true");
  // }
  // console.log(req.params);
  // console.log("sessions? ", req.session);
  // !!!!!!!!!!!!!!!! been using this \/\/
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
  // console.log("req.session  ", req.session);
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
  // console.log("req.session  ", req.session);
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
  // console.log("req.session  ", req.session);
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
