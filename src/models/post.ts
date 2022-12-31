import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    contentHtml: { type: String, required: true },
    published: { type: Boolean, required: true },
    image: {type: Map, of: String, required: false, },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
