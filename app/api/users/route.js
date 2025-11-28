import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    // check fields
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { status: 400 }
      );
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, error: "Email already exists" }),
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        user,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
}
