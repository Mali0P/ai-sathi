"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react"; // ✅ import signIn

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use NextAuth signIn with credentials
    const res = await signIn("credentials", {
      redirect: false, // we handle redirect manually
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/home"); // redirect on successful login
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="text-muted-foreground mt-4 text-sm">
            Enter your email below to login to your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Field>
          <Button
            type="submit"
            className="bg-[#feb707] hover:bg-[#f2ac04] cursor-pointer"
          >
            Login
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="underline underline-offset-4 font-bold text-[#feb707] hover:!text-[#f2ac04]"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
