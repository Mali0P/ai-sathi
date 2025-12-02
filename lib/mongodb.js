import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // If already connected, use existing connection
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "aisathi", // Your database
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};
