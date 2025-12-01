"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Create user in MongoDB via your API
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Auto-login using NextAuth Credentials
        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (!loginRes.error) {
          router.push("/home"); // Redirect to home
        } else {
          router.push("/login"); // Fallback
        }
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
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
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Ful Maya"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="fulmaya@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email with anyone else.
          </FieldDescription>
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
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Field>
          <Button type="submit" className="bg-[#feb707] hover:bg-[#f2ac04]">
            Create Account
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 font-bold text-[#feb707] hover:text-[#f2ac04]"
            >
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
