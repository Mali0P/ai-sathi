import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  chatId: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
