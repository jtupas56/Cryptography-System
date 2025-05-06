import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

// In-memory user database (for demo purposes)
// In a real application, you would use a database
const users: User[] = []

interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

interface CreateUserParams {
  name: string
  email: string
  password: string
}

export async function createUser({ name, email, password }: CreateUserParams): Promise<User> {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create new user
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }

  // Save user (in a real app, you would save to a database)
  users.push(newUser)

  return newUser
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email)
}

export async function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function getSession() {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie || !sessionCookie.value) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      return null
    }

    return session
  } catch (error) {
    return null
  }
}
