import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // If user is already logged in, redirect to homepage
  if (session?.user?.email) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
} 