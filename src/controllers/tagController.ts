import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Tag from "../models/tag";
import Post from "../models/post";

// Return JSON of all tags
const tag_list = (req: Request, res: Response, next: NextFunction) => {
  Tag.find()
    .exec()
    .then((tag) => {
      res.json({ tag });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle tag create on POST
const tag_create = [
  // Validate and sanitize data
  body("name", "Please enter a tag").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Tag object with trimmed data
    const newTag = new Tag({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      newTag
        .save()
        .then((tag) => {
          res.json({ tag });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Return JSON for a specific tag
const tag_detail = (req: Request, res: Response, next: NextFunction) => {
  Promise.all([
    Tag.findById(req.params.tagId).exec(),
    Post.find({ "tags._id": req.params.tagId }),
  ])
    .then(([tag, posts]) => {
      res.json({ tag, posts });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle tag update on PUT
const tag_update = [
  // Validate and sanitize data
  body("name", "Please enter a tag").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Tag object with trimmed data
    const newTag = new Tag({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      Tag.findByIdAndUpdate(req.params.tagId, newTag)
        .exec()
        .then((tag) => {
          res.json({ tag });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Handle tag delete on DELETE
const tag_delete = (req: Request, res: Response, next: NextFunction) => {
  Tag.findByIdAndRemove(req.params.tagId)
    .exec()
    .then((tag) => {
      res.json({
        tag,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  tag_list,
  tag_create,
  tag_detail,
  tag_update,
  tag_delete,
};
