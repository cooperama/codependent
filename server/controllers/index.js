module.exports = {
  // MVP
  users: require("./usersCtrl"),
  codegories: require("./codegoriesCtrl"),
  posts: require("./postsCtrl"),
  comments: require("./commentsCtrl"),
  // Stretchy
  availability: require("./availCtrl"),
  paired: require("./pairedCtrl"),
};

// populationception
// User.
// findOne({ name: 'Val' }).
// populate({
//   path: 'friends',
//   // Get friends of friends - populate the 'friends' array for every friend
//   populate: { path: 'friends' }
// });
