const express = require("express");

const postController = require("../controllers/post.controller");

const router = express.Router();

// to get all posts
router.get("/", postController.getAll);

//to create a new posts
router.post("/", postController.save);

//to get a single post by Id
router.get("/:id", postController.show);

//to update an existing post

router.patch("/:id", postController.update);

// to delte and existing post
router.delete("/:id", postController.destroy);

module.exports = router;
