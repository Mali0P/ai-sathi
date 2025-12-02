import { NextResponse } from "next/server";
import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb"; // your DB connection function

export async function POST(req) {
  try {
    await connectDB();

    const { chatId } = await req.json();
    if (!chatId) {
      return NextResponse.json({ success: false, message: "No chatId provided" }, { status: 400 });
    }

    // Delete all messages with this chatId
    await Message.deleteMany({ chatId });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("deleteChat error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
