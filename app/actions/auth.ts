"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createUser, getUserByEmail, validatePassword } from "@/app/lib/auth"

// Login form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

// Register form validation schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function login(formData: FormData) {
  // Get form data
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate form data
  const result = loginSchema.safeParse({ email, password })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  try {
    // Check if user exists
    const user = await getUserByEmail(email)
    if (!user) {
      return { error: "Invalid email or password" }
    }

    // Validate password
    const isValid = await validatePassword(password, user.password)
    if (!isValid) {
      return { error: "Invalid email or password" }
    }

    // Create session
    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    // Set session cookie
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login" }
  }
}

export async function register(formData: FormData) {
  // Get form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate form data
  const result = registerSchema.safeParse({ name, email, password })
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return { error: "Email already in use" }
    }

    // Create new user
    const user = await createUser({ name, email, password })

    // Create session
    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    // Set session cookie
    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "An error occurred during registration" }
  }
}

export async function logout() {
  // Delete session cookie
  cookies().delete("session")
  redirect("/")
}
