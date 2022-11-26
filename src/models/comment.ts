import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true, immutable: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
