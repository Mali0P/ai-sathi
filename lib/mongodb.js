import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "aisathi",
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};
