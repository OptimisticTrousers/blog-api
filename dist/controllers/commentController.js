"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("../models/comment"));
const express_validator_1 = require("express-validator");
// Handle comment create on POST
const comment_create_post = [
    // Validate and sanitize data
    (0, express_validator_1.body)("name", "Please enter a title").trim().isLength({ min: 1 }),
    (0, express_validator_1.body)("contentHtml", "Please enter content").trim().isLength({ min: 1 }),
    // Process request after validation and sanitization
    (req, res, next) => {
        // Extract the validation errors from a request
        const errors = (0, express_validator_1.validationResult)(req);
        // Create a Post object with trimmed data
        const newComment = new comment_1.default({
            name: req.body.name,
            contentHtml: req.body.contentHtml,
        });
        if (!errors.isEmpty()) {
            // There are errors so return an error
            res.sendStatus(502);
        }
        else {
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
exports.default = {
    comment_create_post,
};
