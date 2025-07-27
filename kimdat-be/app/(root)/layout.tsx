import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import type { Role } from "@prisma/client"

interface User {
  email: string
  role: Role
}

async function createUserIfNotExists(email: string): Promise<User> {
  let user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        role: "USER" // Default role
      }
    })
  }

  return user
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // If no session, redirect to login
  if (!session?.user?.email) {
    redirect("/login")
  }

  // Create user if not exists in database
  const user = await createUserIfNotExists(session.user.email)
  
  console.error(user.role)
  // Role-based access control at layout level
  // Restrict USER role from accessing any routes under (root)
  if (user.role === "USER") {
    console.log("User role is USER, redirecting to no-permission") 
    redirect("/no-permission")
  }
  
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen">
        {children}
      </div>
    </SessionProvider>
  )
} 