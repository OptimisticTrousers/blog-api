import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { s3Uploadv3 } from "../config/s3";
import Post from "../models/post";

// Return JSON of all posts
const post_list = (req: Request, res: Response, next: NextFunction) => {
  Post.find()
    .populate("category")
    .populate("tags")
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
  body("tags", "Please add tags").exists(),
  body("caption", "Please enter a caption")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Please add a category").exists(),
  body("createdAt", "Please add a createdAt date").exists(),
  body("updatedAt", "Please add an updatedAt date").exists(),

  // Process request after validation and sanitization
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = new Post({
      title: req.body.title,
      contentHtml: req.body.contentHtml,
      published: req.body.published,
      category: req.body.category,
      tags: req.body.tags.split(","),
      image: req.file,
      caption: req.body.caption,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      console.log(req.file);
      if (req.file) {
        const results = await s3Uploadv3(req.file);
      }
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
    .populate("category")
    .populate("tags")
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
  body("tags", "Please add tags").exists(),
  body("category", "Please add a category").exists(),
  body("caption", "Please enter a caption")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Please add a category").exists(),
  body("createdAt", "Please add a createdAt date").exists(),
  body("updatedAt", "Please add an updatedAt date").exists(),
  // Process request after validation and sanitization
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with trimmed data
    const newPost = {
      title: req.body.title,
      contentHtml: req.body.contentHtml,
      published: req.body.published,
      category: req.body.category,
      tags: req.body.tags.split(","),
      ...(req.file && { image: req.file }),
      ...(req.body.caption && { caption: req.body.caption }),
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    };

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      if (req.file) {
        const results = await s3Uploadv3(req.file);
      }
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
    .then(async (post) => {
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
