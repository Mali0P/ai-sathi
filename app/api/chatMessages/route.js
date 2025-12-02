import { NextResponse } from "next/server";
import Message from "@/models/Message";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { chatId } = await req.json();
    if (!chatId) return NextResponse.json({ error: "chatId missing" }, { status: 400 });

    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
