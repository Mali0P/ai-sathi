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

    const userId = session.user.id;

    // Aggregate to get the first user message per chat
    const chats = await Message.aggregate([
      { $match: { userId, role: "user" } }, // only user messages
      { $sort: { createdAt: 1 } },          // oldest first
      {
        $group: {
          _id: "$chatId",
          firstUserMessage: { $first: "$content" },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } },         // sort chats by first message time descending
    ]);

    return NextResponse.json({ history: chats });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
