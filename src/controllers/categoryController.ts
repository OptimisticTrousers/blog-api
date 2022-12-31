import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Category from "../models/category";
import Post from "../models/post";

// Return JSON of all categories
const category_list = (req: Request, res: Response, next: NextFunction) => {
  Category.find()
    .exec()
    .then((category) => {
      res.json({ category });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle category create on POST
const category_create = [
  // Validate and sanitize data
  body("name", "Please enter a category name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Category object with trimmed data
    const newCategory = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      newCategory
        .save()
        .then((category) => {
          res.json({ category });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Return JSON for a specific category
const category_detail = (req: Request, res: Response, next: NextFunction) => {
  Promise.all([
    Category.findById(req.params.categoryId).exec(),
    Post.find({ "category._id": req.params.categoryId }),
  ])
    .then(([category, posts]) => {
      res.json({ category, posts });
    })
    .catch((err) => {
      next(err);
    });
};

// Handle category update on PUT
const category_update = [
  // Validate and sanitize data
  body("name", "Please enter a category name").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization
  (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Category object with trimmed data
    const newCategory = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors so return an error
      res.sendStatus(502);
    } else {
      Category.findByIdAndUpdate(req.params.categoryId, newCategory)
        .exec()
        .then((category) => {
          res.json({ category });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
];

// Handle category delete on DELETE
const category_delete = (req: Request, res: Response, next: NextFunction) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .exec()
    .then((category) => {
      res.json({
        category,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export default {
  category_list,
  category_create,
  category_detail,
  category_update,
  category_delete,
};
