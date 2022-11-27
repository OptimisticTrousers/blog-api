"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("../models/comment"));
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
// Return JSON of all posts
const post_list = (req, res, next) => {
    post_1.default.find()
        .exec()
        .then((posts) => {
        res.json({ posts });
    })
        .catch((err) => {
        next(err);
    });
};
// Handle post create on POST
const post_create_post = [
    // Validate and sanitize data
    (0, express_validator_1.body)("title", "Please enter a title").trim().isLength({ min: 1 }),
    (0, express_validator_1.body)("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
    (0, express_validator_1.body)("published", "Please decide if you want to publish this point").toBoolean(),
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        // Create a Post object with trimmed data
        const newPost = new post_1.default({
            title: req.body.title,
            contentHtml: req.body.contentHtml,
            published: req.body.published,
        });
        if (!errors.isEmpty()) {
            // There are errors so return an error
            res.sendStatus(502);
        }
        else {
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
const post_detail = (req, res, next) => {
    Promise.all([
        post_1.default.findById(req.params.postId).exec(),
        comment_1.default.find({ postId: req.params.postId }).exec(),
    ])
        .then(([posts, comments]) => {
        res.json({ posts, comments });
    })
        .catch((err) => {
        next(err);
    });
};
// Handle post update on PUT
const post_update_put = [
    // Validate and sanitize data
    (0, express_validator_1.body)("title", "Please enter a title").trim().isLength({ min: 1 }),
    (0, express_validator_1.body)("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
    (0, express_validator_1.body)("published", "Please decide if you want to publish this point").toBoolean(),
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        // Create a Post object with trimmed data
        const newPost = new post_1.default({
            title: req.body.title,
            contentHtml: req.body.contentHtml,
            published: req.body.published,
        });
        if (!errors.isEmpty()) {
            // There are errors so return an error
            res.sendStatus(502);
        }
        else {
            post_1.default.findByIdAndUpdate(req.params.postId, newPost)
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
const post_update_delete = (req, res, next) => {
    post_1.default.findByIdAndRemove(req.body.postId)
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
exports.default = {
    post_list,
    post_create_post,
    post_detail,
    post_update_put,
    post_update_delete,
};
