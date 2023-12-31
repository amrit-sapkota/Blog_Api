const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Apply body-parser middleware first
app.use(bodyParser.json());

// Then, apply express.json() middleware
app.use(express.json());

// Now, you can define your routes
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");

app.use("/posts", postRoute);
app.use("/users", userRoute);

module.exports = app;
