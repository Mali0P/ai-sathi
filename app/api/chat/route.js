import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ reply: "Message is empty" }, { status: 400 });
    }

    console.log("Using API Key:", process.env.AI_SATHI); // debug

    const ai = new GoogleGenAI({
      apiKey: process.env.AI_SATHI, // server-side only
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // free-tier model
      contents: [message],        // must be array
    });

    return NextResponse.json({
      reply: response.text || "Sorry, no response",
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { reply: "Something went wrong" },
      { status: 500 }
    );
  }
}
