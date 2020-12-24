const db = require("./models");
const codegoryData = require("./codegories.json");
const userData = require("./users.json");

// PRESEED USERS
// db.User.deleteMany({}, (err, deletedUsers) => {
//   db.User.create(userData.users, (err, seededUsers) => {
//     if (err) console.log(err);
//     console.log(seededUsers.length, "Users created successfully");

//     process.exit();
//   });
// });

// PRESEED CODEGORIES
// db.Codegory.deleteMany({}, (err, deletedCodegories) => {
//   db.Codegory.create(codegoryData.codegories, (err, seededCodegories) => {
//     if (err) console.log(err);

//     console.log(
//       codegoryData.codegories.length,
//       "Codegories created successfully"
//     );

//     process.exit();
//   });
// });

// REMOVE AVAIL ARRAYS
// db.User.find({}).then((users) => {
//   users.forEach((user) => {
//     user.available = [];
//     user.save();
//     console.log("user from seed ~ removing available", user);
//   });
// });

// // REMOVE PAIRED ARRAYS
// db.User.find({}).then((users) => {
//   users.forEach((user) => {
//     user.paired = [];
//     user.save();
//     console.log("user from seed ~ removing available", user);
//   });
// });
