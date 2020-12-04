const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { generateAccessToken } = require("../auth");
require("dotenv").config();

const token = (req, res) => {
  //
  const refreshToken = req.body.token;
};

const login = (req, res) => {
  console.log("logging in... user controller: ", req.body);
  db.User.findOne({ email: req.body.email })
    .populate("posts comments available paired")
    .then((user) => {
      console.log("logging in... user controller findOne: ", user);
      if (!user) return console.log("no user found");
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return console.log("error with passwords");
        if (isMatch) {
          const signedJwt = jwt.sign(
            { _id: user._id },
            // user,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          console.log("login ctrl, line 30 ", user);
          res.json({
            status: 200,
            message: "success",
            id: user._id,
            signedJwt,
            // ???? how i was doing it before...
            user,
          });
        } else {
          console.log(" not is match.....", isMatch);
          res.json({ error: "Passwords do not match" });
        }
      });
    })
    .catch((err) => console.log("error in user log in: ", err));
};

const signup = (req, res) => {
  db.User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return console.log("user already exists");
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log("error generating salt");

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log("err hashing password");

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
  db.User.findById(req.userId)
    // db.User.findById(req.params.id)
    .populate("posts comments available paired")
    .then((foundUser) => {
      console.log("users controller get user", foundUser);
      res.json({ user: foundUser });
    })
    .catch((err) => {
      console.log("Error in users.getUser: ", err);
      res.json({ error: "Unable to get data" });
    });
};

const updateUser = (req, res) => {
  console.log("req.params  ", req.params);
  db.User.findById(req.params.id).then((user) => {
    console.log("user in update user users controller: ", user);
    if (req.body.password2) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return console.log("error with passwords");
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) return console.log("error generating salt");

            bcrypt.hash(req.body.password2, salt, (err, hashedPassword) => {
              if (err) return console.log("err hashing password");

              const updatedUser = {
                username: req.body.username,
                email: req.body.email,
                fullname: req.body.fullname,
                password: hashedPassword,
              };
              db.User.findByIdAndUpdate(req.params.id, updatedUser, {
                new: true,
              })
                .then((updatedUser) => {
                  // Send user without the password???
                  const signedJwt = jwt.sign(
                    { _id: updatedUser._id },
                    // user,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1h" }
                  );
                  console.log("login ctrl, line 127 ", updatedUser);
                  res.json({
                    status: 200,
                    message: "success",
                    id: updatedUser._id,
                    signedJwt,
                    updatedUser,
                  });
                  // res.json({ user: updatedUser });
                })
                .catch((err) => {
                  console.log("Error in users.updateUser: ", err);
                  res.json({ error: "Unable to get data" });
                });
            });
          });
        } else {
          console.log(" not is match updatedUser .....", isMatch);
          res.json({ error: "Passwords do not match" });
        }
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return console.log("error with passwords");
        if (isMatch) {
          const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname,
            // password,
          };
          db.User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
            .then((updatedUser) => {
              // Send user without the password???
              const signedJwt = jwt.sign(
                { _id: updatedUser._id },
                // user,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
              );
              console.log("login ctrl, line 127 ", updatedUser);
              res.json({
                status: 200,
                message: "success",
                id: updatedUser._id,
                signedJwt,
                updatedUser,
              });
              // res.json({ user: updatedUser });
            })
            .catch((err) => {
              console.log("Error in users.updateUser: ", err);
              res.json({ error: "Unable to get data" });
            });
        } else {
          console.log(" not is match updatedUser .....", isMatch);
          res.json({ error: "Passwords do not match" });
        }
      });
    }
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
  // console.log(req.session);
  // if (req.session.currentUser) {
  //   req.session.destroy((err) => {
  //     if (err) return console.log("error destroying session");
  //   });
  // }
};

module.exports = {
  login,
  logout,
  signup,
  allUsers,
  token,
  getUser,
  updateUser,
  deleteUser,
};
