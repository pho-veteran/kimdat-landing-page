import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function NoPermissionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // If no session, redirect to login
  if (!session?.user?.email) {
    redirect("/login")
  }

  // Get user from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    redirect("/login")
  }

  // If user is NOT USER role (i.e., ADMIN or STAFF), redirect to dashboard
  // Only USER role should see the no-permission page
  if (user.role !== "USER") {
    redirect("/")
  }

  return (
    <div>
      {children}
    </div>
  )
} 