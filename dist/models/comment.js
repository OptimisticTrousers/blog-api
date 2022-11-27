"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CommentSchema = new Schema({
    name: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true, immutable: true },
    contentHtml: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Comment", CommentSchema);
