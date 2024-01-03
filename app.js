const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Applying body-parser middleware first
app.use(bodyParser.json());

// Then, applying express.json() middleware
app.use(express.json());

//to make directory publicly accessible
app.use("/uploads", express.static("uploads"));

// Now,  defining the routes
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const commentRoute = require("./routes/comments");
const imageRoute = require("./routes/images");

app.use("/posts", postRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/images", imageRoute);

module.exports = app;
