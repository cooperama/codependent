const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
// const { generateAccessToken } = require("../auth");
require("dotenv").config();

// const token = (req, res) => {
//   //
//   const refreshToken = req.body.token;
// };

const login = (req, res) => {
  db.User.findOne({ username: req.body.username })
    .populate("posts comments available paired")
    .then((user) => {
      if (!user) {
        return res.json({ error: "username not found" });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          return res.json({ error: "incorrect password" });
        }
        if (isMatch) {
          const signedJwt = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          res.json({
            status: 200,
            message: "success",
            id: user._id,
            signedJwt,
          });
        } else {
          console.log(" not is match.....in bcrypt.compare");
          return res.json({ error: "incorrect password..." });
        }
      });
    })
    .catch((err) => {
      console.log("error in user log in: ", err);
      return res.json({ error: "an error occurred" });
    });
};

const signup = (req, res) => {
  // Check that passwords match, and username and email are unique
  if (req.body.password !== req.body.password2) {
    return res.json({ error: "passwords must match" });
  }
  db.User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.json({ error: "username already exists" });
    }
    db.User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res.json({ error: "email already exists" });
      }
      // Encrypt password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log("error generating salt");
          return res.json({ error: "an error occurred" });
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            console.log("err hashing password");
            return res.json({ error: "an error occurred" });
          }

          const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          };

          db.User.create(newUser)
            .then((newUser) => {
              const signedJwt = jwt.sign(
                { _id: newUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
              );
              res.json({
                status: 200,
                message: "success",
                id: newUser._id,
                signedJwt,
              });
            })
            .catch((err) => {
              console.log("Error in users.signup: ", err);
              return res.json({ error: "an error occurred" });
            });
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
  console.log("req.userId here...??? how???, ", req.userId);
  // auth.js jwt.verify is being run
  db.User.findById(req.userId)
    .populate("posts comments available paired")
    .then((foundUser) => {
      console.log("users controller get user", foundUser);
      res.json({ user: foundUser });
    })
    .catch((err) => {
      console.log("Error in users.getUser: ", err);
      res.json({ error: "an error occurred" });
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

// const logout = (req, res) => {
//   // console.log("req.session  ", req.session);
//   console.log("users ctrl");
//   // console.log(req.session);
//   // if (req.session.currentUser) {
//   //   req.session.destroy((err) => {
//   //     if (err) return console.log("error destroying session");
//   //   });
//   // }
// };

module.exports = {
  login,
  // logout,
  signup,
  allUsers,
  // token,
  getUser,
  updateUser,
  deleteUser,
};
