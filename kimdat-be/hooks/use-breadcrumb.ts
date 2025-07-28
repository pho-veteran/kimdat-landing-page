"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

// Route translations to Vietnamese
const routeTranslations: Record<string, string> = {
  dashboard: "Bảng điều khiển",
  products: "Sản phẩm",
  categories: "Danh mục sản phẩm",
  news: "Tin tức",
  "news-categories": "Danh mục tin tức",
}

// Route configurations
const routeConfigs: Record<string, { label: string; href: string }> = {
  "/": { label: "Bảng điều khiển", href: "/" },
  "/dashboard": { label: "Bảng điều khiển", href: "/" },
  "/dashboard/products": { label: "Sản phẩm", href: "/dashboard/products" },
  "/dashboard/products/categories": { label: "Danh mục sản phẩm", href: "/dashboard/products/categories" },
  "/dashboard/news": { label: "Tin tức", href: "/dashboard/news" },
  "/dashboard/news/categories": { label: "Danh mục tin tức", href: "/dashboard/news/categories" },
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname()

  return useMemo(() => {
    // Handle root/dashboard case
    if (pathname === "/" || pathname === "/dashboard") {
      return [
        {
          label: "Bảng điều khiển",
          href: "/",
          isCurrentPage: true,
        },
      ]
    }

    // Split pathname into segments
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always add dashboard as first item for sub-routes
    if (segments.length > 1) {
      breadcrumbs.push({
        label: "Bảng điều khiển",
        href: "/",
        isCurrentPage: false,
      })
    }

    // Build breadcrumbs for each segment
    let currentPath = ""
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Skip 'dashboard' segment since we already added it
      if (segment === "dashboard") return

      const isLast = index === segments.length - 1
      const config = routeConfigs[currentPath]
      
      if (config) {
        breadcrumbs.push({
          label: config.label,
          href: config.href,
          isCurrentPage: isLast,
        })
      } else {
        // Fallback for unmatched routes
        const label = routeTranslations[segment] || 
                     segment.charAt(0).toUpperCase() + segment.slice(1)
        
        breadcrumbs.push({
          label,
          href: currentPath,
          isCurrentPage: isLast,
        })
      }
    })

    return breadcrumbs
  }, [pathname])
} 