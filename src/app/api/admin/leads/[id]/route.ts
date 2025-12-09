import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

// UPDATE STATUS (e.g., Mark as "Contacted")
export async function PATCH(
  request: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // FIX: Await the params to get the ID
    const { id } = await params;
    
    const { status } = await request.json();
    await connectDB();
    await Lead.findByIdAndUpdate(id, { status });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE LEAD
export async function DELETE(
  request: Request,
  // FIX: Type 'params' as a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // FIX: Await the params to get the ID
    const { id } = await params;

    await connectDB();
    await Lead.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete Failed" }, { status: 500 });
  }
}