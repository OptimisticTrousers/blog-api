import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment";
import { body, validationResult } from "express-validator";

// Handle comment create on POST
const comment_create_post = [
  // Validate and sanitize data
  body("name", "Please enter a name").trim().isLength({ min: 1 }).escape(),
  body("email", "Please enter an email").trim().isEmail().escape(),
  body("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    console.log(req.body)

    // Create a Post object with trimmed data
    const newComment = new Comment({
      name: req.body.name,
      email: req.body.email,
      postId: req.body.postId,
      contentHtml: req.body.contentHtml,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      newComment
        .save()
        .then((comment) => {
          res.json({ comment });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

export default {
  comment_create_post,
};
