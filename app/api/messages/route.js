import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.sub) return new Response("Unauthorized", { status: 401 });

  const { content, role, chatId } = await req.json();
  await connectDB();

  try {
    const result = await Message.create({
      userId: token.sub,
      chatId,
      role,
      content,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to save message", { status: 500 });
  }
}

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.sub) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  if (!chatId) return new Response("Missing chatId", { status: 400 });

  await connectDB();
  try {
    const messages = await Message.find({ userId: token.sub, chatId })
      .sort({ createdAt: 1 })
      .lean();

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to fetch messages", { status: 500 });
  }
}
