import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, immutable: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  published: { type: Boolean, required: true },
});

export default mongoose.model("Post", PostSchema);
