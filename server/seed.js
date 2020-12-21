const db = require("./models");
const codegoryData = require("./codegories.json");
const userData = require("./users.json");

// db.Codegory.deleteMany({}, (err, deletedCodegories) => {
//   db.Codegory.create(codegoryData.codegories, (err, seededCodegories) => {
//     if (err) console.log(err);

// db.User.deleteMany({}, (err, deletedUsers) => {
//   db.User.create(data.userData, (err, seededUsers) => {
//     if (err) console.log(err);

// db.Codegory.deleteMany({}, (err, deletedCodegories) => {
//   db.Codegory.create(codegoryData.codegories, (err, seededCodegories) => {
//     if (err) console.log(err);

//     console.log(codegoryData.codegories.length, "Codegories created successfully");

//     process.exit();
//   });
// });

// Remove avail array ~~
// db.User.find({}).then((users) => {
//   users.forEach((user) => {
//     user.available = [];
//     user.save();
//     console.log("user from seed ~ removing available", user);
//   });
// });

// // Remove paired array ~~
// db.User.find({}).then((users) => {
//   users.forEach((user) => {
//     user.paired = [];
//     user.save();
//     console.log("user from seed ~ removing available", user);
//   });
// });
