"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Package,
  Newspaper,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { LogoutButton } from "@/components/nav-user"
import { ModeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

// Logo component for sidebar
function SidebarLogo() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Link 
      href="/"
      className="group block transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md"
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center py-2 pl-1' : 'gap-3 px-3 py-4'}`}>
        <Image
          src="/logo.png"
          alt="KimDat Logo"
          width={isCollapsed ? 44 : 48}
          height={isCollapsed ? 44 : 48}
          className="object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
          priority
        />
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-bold font-mono tracking-wider leading-none group-hover:text-primary transition-colors duration-200">
              KIMDAT
            </span>
            <span className="text-[0.5rem] font-medium tracking-wider uppercase opacity-70 group-hover:opacity-90 transition-opacity duration-200">
              Forest Products
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

// Navigation data for the sidebar
const data = {
  navMain: [
    {
      title: "Sản phẩm",
      url: "#",
      icon: Package,
      isActive: true,
      items: [
        {
          title: "Danh mục sản phẩm",
          url: "/products/categories",
        },
        {
          title: "Sản phẩm",
          url: "/products",
        },
      ],
    },
    {
      title: "Tin tức",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "Danh mục tin tức",
          url: "/news/categories",
        },
        {
          title: "Tin tức",
          url: "/news",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className={isCollapsed ? "flex flex-col gap-1" : "flex gap-2"}>
          <div className="flex-1">
            <ModeToggle />
          </div>
          <div className="flex-1">
            <LogoutButton />
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
