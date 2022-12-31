import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/post";

// Return JSON of all posts
const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .exec()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle post create on POST
const post_create = [
  // Validate and sanitize data
  body("title", "Please enter a title").trim().isLength({ min: 1 }).escape(),
  body("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
  body("published", "Please decide if you want to publish this post")
    .toBoolean()
    .exists(),
  body("tags", "Please add tags").isArray({ min: 1 }).exists(),
  body("category", "Please add a category").isArray({ min: 1 }).exists(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = new Post({
      title: req.body.title,
      contentHtml: req.body.contentHtml,
      published: req.body.published,
      category: req.body.category,
      tags: req.body.tags,
      image: req.file,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      newPost
        .save()
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Return JSON for a specific post
const post_detail = (req: Request, res: Response, next: NextFunction) => {
  Post.findById(req.params.postId)
    .exec()
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle post update on PUT
const post_update = [
  // Validate and sanitize data
  body("title", "Please enter a title").trim().isLength({ min: 1 }).escape(),
  body("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
  body("published", "Please decide if you want to publish this post")
    .toBoolean()
    .exists(),
  body("tags", "Please add tags").isArray({ min: 1 }).exists(),
  body("category", "Please add a category").isArray({ min: 1 }).exists(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = new Post({
      title: req.body.title,
      contentHtml: req.body.contentHtml,
      published: req.body.published,
      category: req.body.category,
      tags: req.body.tags,
      ...(req.file && { image: req.file }),
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      Post.findByIdAndUpdate(req.params.postId, newPost)
        .exec()
        .then((post) => {
          res.json({ post });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Handle post delete on DELETE
const post_delete = (req: Request, res: Response, next: NextFunction) => {
  Post.findByIdAndRemove(req.params.postId)
    .exec()
    .then((post) => {
      res.json({
        post,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  post_list,
  post_create,
  post_detail,
  post_update,
  post_delete,
};
