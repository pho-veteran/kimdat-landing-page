"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function LogoutButton() {
  const { state } = useSidebar()
  
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Fallback: redirect manually if signOut fails
      window.location.href = "/login"
    }
  }

  const isCollapsed = state === "collapsed"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size={isCollapsed ? "default" : "lg"}
          onClick={handleLogout}
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          tooltip={isCollapsed ? "Đăng xuất" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Đăng xuất</span>
              <span className="truncate text-xs">Thoát</span>
            </div>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
