import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true, immutable: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", CommentSchema);
