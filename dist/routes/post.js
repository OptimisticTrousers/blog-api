"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const commentController_1 = __importDefault(require("../controllers/commentController"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(postController_1.default.post_list)
    .post(postController_1.default.post_create_post);
router
    .route("/:postId")
    .get(postController_1.default.post_detail)
    .put(postController_1.default.post_update_put)
    .delete(postController_1.default.post_update_delete);
router.route("/:postId/comments").post(commentController_1.default.comment_create_post);
exports.default = router;
