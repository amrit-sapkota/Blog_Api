const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");
const validator = new Validator();

function signUp(req, res) {
  const validationSchema = {
    name: { type: "string", empty: false },
    email: { type: "email", empty: false },
    password: { type: "string", min: 6, empty: false },
  };
  const validationErrors = validator.validate(req.body, validationSchema);

  if (validationErrors !== true) {
    return res.status(400).json({ errors: validationErrors });
  }
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already exists",
        });
      } else {
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
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function login(req, res) {
  const validationSchema = {
    email: { type: "email", empty: false },
    password: { type: "string", empty: false },
  };
  const validationErrors = validator.validate(req.body, validationSchema);

  if (validationErrors !== true) {
    return res.status(400).json({ errors: validationErrors });
  }
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Inavlid credentials" });
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                function (err, token) {
                  res.status(200).json({
                    message: "Authentication suceesful",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invalid Authentication",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error while trying to authenticate the user",
      });
    });
}

module.exports = { signUp: signUp, login: login };
