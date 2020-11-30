const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();
require("dotenv");

const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000",
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

// set up routes
// app.use("/api/v1/users", routes.users);
// app.use("/api/v1/codegories", routes.codegories);
// app.use("/api/v1/rooms", routes.rooms);
// app.use("/api/v1/comments", routes.comments);

app.get("/", (req, res) => {
  res.send("co[de]pendent lol");
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
