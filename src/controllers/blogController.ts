import { Request, Response, NextFunction } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";

// Return JSON of all posts
const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .exec()
    .then((posts) => {
      res.json({ posts, message: "Returned all posts" });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle post create on POST
const post_create_post = [
  // Validate and sanitize data
  body("title", "Please enter a title").trim().isLength({ min: 1 }),
  body("content", "Please enter content").trim().isLength({ min: 1 }),
  body(
    "published",
    "Please decide if you want to publish this point"
  ).toBoolean(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      newPost
        .save()
        .then((post) => {
          res.json({ post, message: "Created post" });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Return JSON for a specific post
const post_detail = (req: Request, res: Response, next: NextFunction) => {
  Promise.all([
    Post.findById(req.params.postId).exec(),
    Comment.find({ postId: req.params.postId }).exec(),
  ])
    .then(([posts, comments]) => {
      res.json({ posts, comments, message: "Returned post and its comments" });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle post update on PUT
const post_update_put = [
  // Validate and sanitize data
  body("title", "Please enter a title").trim().isLength({ min: 1 }),
  body("content", "Please enter content").trim().isLength({ min: 1 }),
  body(
    "published",
    "Please decide if you want to publish this point"
  ).toBoolean(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      Post.findByIdAndUpdate(req.params.postId, newPost)
        .exec()
        .then((post) => {
          res.json({ post, message: "Updated post" });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Handle post delete on DELETE
const post_update_delete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Post.findByIdAndRemove(req.body.postId)
    .exec()
    .then((post) => {
      res.json({
        post,
        message: "Deleted post",
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  post_list,
  post_create_post,
  post_detail,
  post_update_put,
  post_update_delete,
};
