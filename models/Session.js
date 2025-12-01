import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  chatId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema);
export default Session;
