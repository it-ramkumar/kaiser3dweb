import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

// Force dynamic so it doesn't cache the list forever
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    // Fetch all leads, sorted by newest first
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}