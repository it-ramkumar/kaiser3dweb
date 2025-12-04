import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Lead from '@/models/Lead';

// POST /api/leads
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // Create the lead
    const lead = await Lead.create(body);

    return NextResponse.json(
      { success: true, data: lead, message: 'Lead submitted successfully' }, 
      { status: 201 }
    );

  } catch (error: any) {
    // Duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}

// GET /api/leads (Admin Dashboard usage)
export async function GET() {
  try {
    await connectDB();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}