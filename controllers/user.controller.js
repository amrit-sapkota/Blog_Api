const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function signUp(req, res) {
  bcrypt.genSalt(5, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };

      models.User.create(user)
        .then((result) => {
          res.status(201).json({
            message: "User created successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Something went wrong",
          });
        });
    });
  });
}

module.exports = { signUp: signUp };
