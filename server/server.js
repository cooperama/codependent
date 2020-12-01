const express = require("express");
const cors = require("cors");
const session = require("express-session");

const routes = require("./routes");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000",
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// set up routes
// MVP
app.use("/api/v1/users", routes.users);
app.use("/api/v1/codegories", routes.codegories);
app.use("/api/v1/comments", routes.comments);
app.use("/api/v1/posts", routes.posts);
// Stretchy
app.use("/api/v1/avail", routes.avail);
app.use("/api/v1/paired", routes.paired);

// Server home
app.get("/", (req, res) => {
  res.send("co[de]pendent lol");
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
