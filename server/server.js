const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Email Function
// const requestPartner = require("./nodemail");

// send email requesting partner
// app.post("/sendrequest", (req, res) => {
//   const recipient = req.body.recipientEmail;
//   requestPartner(recipient)
//   res.send("request sent");
// });

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

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

if (process.env.NODE_ENV === "production") {
  //
}

// API
app.use("/api/v1/users", routes.users);
app.use("/api/v1/codegories", routes.codegories);
app.use("/api/v1/comments", routes.comments);
app.use("/api/v1/posts", routes.posts);
app.use("/api/v1/avail", routes.avail);
app.use("/api/v1/paired", routes.paired);

// Server home
app.get("/", (req, res) => {
  res.send("co[de]pendent lol");
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
