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
  if (req.body.password2 && req.body.password2 !== req.body.password3) {
    return res.json({ error: "passwords must match" });
  }
  db.User.findById(req.params.id).then((user) => {
    if (req.body.password2) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) {
          return res.json({ error: "an error occurred" });
        }
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return res.json({ error: "an error occurred" });
            }
            bcrypt.hash(req.body.password2, salt, (err, hashedPassword) => {
              if (err) {
                return res.json({ error: "an error occurred" });
              }
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
                  const signedJwt = jwt.sign(
                    { _id: updatedUser._id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "1h" }
                  );
                  res.json({
                    status: 200,
                    message: "success",
                    id: updatedUser._id,
                    signedJwt,
                    updatedUser,
                  });
                })
                .catch((err) => {
                  console.log("Error in users.updateUser: ", err);
                  return res.json({ error: "an error occurred" });
                });
            });
          });
        } else {
          console.log(" not is match updatedUser .....", isMatch);
          res.json({ error: "passwords must match" });
        }
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return res.json({ error: "an error occurred" });
        if (isMatch) {
          const updatedUser = {
            username: req.body.username,
            email: req.body.email,
            fullname: req.body.fullname,
          };
          db.User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
            .then((updatedUser) => {
              const signedJwt = jwt.sign(
                { _id: updatedUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
              );
              console.log("update user ctrl, line 207 ", updatedUser);
              res.json({
                status: 200,
                message: "success",
                id: updatedUser._id,
                signedJwt,
                // updatedUser,
              });
            })
            .catch((err) => {
              console.log("Error in users.updateUser: ", err);
              res.json({ error: "an error occurred" });
            });
        } else {
          console.log(" not is match updatedUser .....", isMatch);
          res.json({ error: "passwords do not match" });
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
