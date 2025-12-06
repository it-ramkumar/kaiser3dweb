import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

// UPDATE STATUS (e.g., Mark as "Contacted")
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    await connectDB();
    await Lead.findByIdAndUpdate(params.id, { status });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE LEAD
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Lead.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}