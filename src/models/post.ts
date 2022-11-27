import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    contentHtml: { type: String, required: true },
    published: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
