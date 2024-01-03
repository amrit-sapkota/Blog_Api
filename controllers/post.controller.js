const models = require("../models");
const validator = require("fastest-validator");

function save(req, res) {
  // Extracting relevant data from the request body
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
    userId: req.userData.userId,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    imageUrl: { type: "url" },
    categoryId: { type: "number", optional: true },
  };

  const v = new validator();
  const validationResponse = v.validate(post, schema);
  if (validationResponse !== true) {
    return res.status(422).json({ errors: validationResponse });
  }

  models.Category.findByPk(req.body.category_id)
    .then((result) => {
      if (result !== null) {
        models.Post.create(post)
          .then((result) => {
            // Responding with a success message and the created post
            res.status(201).json({
              message: "Post created successfully",
              post: result,
            });
          })
          .catch((error) => {
            // Handling errors by responding with an error message and details
            res.status(500).json({
              message: "Post could not be created",
              error: error,
            });
          });
      } else {
        res.status(400).json({ message: "Invalid Category ID" });
      }
    })
    .catch();

  // Using the `Post` model to create a new post in the database
}

function show(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "No such post found",
      });
    });
}

function getAll(req, res) {
  models.Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error getting posts",
      });
    });
}

function update(req, res) {
  const id = req.params.id;

  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.image_url,
    categoryId: req.body.category_id,
  };
  const userId = req.userData.userId;
  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    imageUrl: { type: "url" },
    categoryId: { type: "number", optional: true },
  };
  // Validate the data before trying to save it in the database
  const v = new validator();
  const validationResponse = v.validate(updatedPost, schema);
  if (validationResponse !== true) {
    return res.status(422).json({ errors: validationResponse });
  }

  models.Category.findByPk(req.body.category_id)
    .then((result) => {
      if (result !== null) {
        models.Post.update(updatedPost, {
          where: { id: id, userId: userId },
        })
          .then((result) => {
            res.status(200).json({
              message: "Post updated suceesfully",
              post: updatedPost,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Error updating post",
              error: error,
            });
          });
      } else {
        res.status(400).json({ message: "Invalid Category ID" });
      }
    })
    .catch();
}

function destroy(req, res) {
  const id = req.params.id;
  const userId = req.userData.userId;

  models.Post.destroy({ where: { id: id, userId: userId } })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted suceesfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting post",
        error: error,
      });
    });
}

// Exporting the `save` function
module.exports = {
  save: save,
  show: show,
  getAll: getAll,
  update: update,
  destroy: destroy,
};
