import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";

// 1. GET: Fetch all posts for the dashboard list
export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// 2. POST: Create a new article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    
    // Auto-generate slug if missing
    const slug = body.slug || body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    const newPost = await Post.create({ ...body, slug });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}