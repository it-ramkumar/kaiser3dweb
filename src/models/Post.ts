import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string; // URL friendly name (e.g., "benefits-of-3d")
  excerpt: string;
  content: string; // HTML or Markdown
  category: string;
  coverImage?: string;
  author: string;
  published: boolean;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    coverImage: { type: String },
    author: { type: String, default: "Kaiser Team" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);