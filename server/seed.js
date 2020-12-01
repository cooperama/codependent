const db = require("./models");
const data = require("./codegories.json");

db.Codegory.deleteMany({}, (err, deletedCodegories) => {
  db.Codegory.create(data.codegories, (err, seededCodegories) => {
    if (err) console.log(err);

    console.log(data.codegories.length, "Codegories created successfully");

    process.exit();
  });
});
