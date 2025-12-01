import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Session from "@/models/Session";

// GET → fetch all sessions of a user
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return new Response("Missing userId", { status: 400 });

  await connectDB();

  try {
    const sessions = await Session.find({ userId }).sort({ createdAt: -1 }).lean();
    return new Response(JSON.stringify({ sessions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}

// POST → create/update a session
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { chatId, sessionTitle } = await req.json();
  if (!chatId) return new Response("Missing chatId", { status: 400 });

  await connectDB();

  try {
    // If session exists → update title
    const existing = await Session.findOne({ userId: session.user.id, chatId });
    if (existing) {
      existing.sessionTitle = sessionTitle || existing.sessionTitle;
      await existing.save();
      return new Response(JSON.stringify(existing), { status: 200 });
    }

    // Otherwise → create new session
    const newSession = await Session.create({
      userId: session.user.id,
      chatId,
      sessionTitle: sessionTitle || "New Chat",
    });

    return new Response(JSON.stringify(newSession), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to save session", { status: 500 });
  }
}
