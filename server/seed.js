const db = require("./models");
const data = require("./codegories.json");

// db.Codegory.deleteMany({}, (err, deletedCodegories) => {
//   db.Codegory.create(data.codegories, (err, seededCodegories) => {
//     if (err) console.log(err);

//     console.log(data.codegories.length, "Codegories created successfully");

//     process.exit();
//   });
// });

// Remove avail array ~~
// db.User.find({ username: "traveler" }).then((users) => {
//   users.forEach((user) => {
//     user.available = [];
//     user.save();
//     console.log("user from seed ~ removing available", user);
//   });
// });
