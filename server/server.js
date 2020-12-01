const express = require("express");
const cors = require("cors");
const { auth, requiresAuth } = require("express-openid-connect");

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
// auth middleware

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
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
  // res.send("co[de]pendent lol");
  res.send(req.oidc.isAuthenticated() ? "Logged In" : "Logged Out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT, () => console.log("Listening on port ", PORT));
