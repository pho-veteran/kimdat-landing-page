import { auth } from "@/lib/auth"
import { SessionProvider } from "next-auth/react"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import type { Role } from "@prisma/client"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { ThemeProvider } from "@/providers/theme-providers"

interface User {
  email: string
  role: Role
}

async function createUserIfNotExists(email: string): Promise<User> {
  let user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        role: "USER", // Default role
      },
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

  // Restrict USER role from accessing any routes under (root)
  if (user.role === "USER") {
    redirect("/no-permission")
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="min-h-screen">
              <AppHeader />
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
} 