"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { ActionCell } from "./action-cell" 

export type Product = {
  id: string
  name: string
  description: string | null
  price: number | null
  material: string | null
  weavingStyle: string | null
  color: string | null
  categoryId: string
  category: {
    id: string
    name: string
  }
  images: Array<{
    id: string
    url: string
    alt: string | null
  }>
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Ảnh bìa",
    cell: ({ row }) => {
      const images = row.original.images
      const firstImage = images && images.length > 0 ? images[0] : null
      
      if (!firstImage) {
        return (
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-500">
            Không có ảnh
          </div>
        )
      }
      
      return (
        <div className="w-16 h-16 relative">
          <Image
            src={firstImage.url}
            alt={firstImage.alt || "Product image"}
            fill
            className="object-cover rounded-md border"
            sizes="64px"
          />
          {images.length > 1 && (
            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {images.length}
            </div>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return (
        <div className="max-w-[200px] truncate" title={name}>
          {name}
        </div>
      )
    }
  },
  {
    accessorKey: "category.name",
    header: "Danh mục",
    cell: ({ row }) => {
      const categoryName = row.original.category.name
      return (
        <div className="max-w-[150px] truncate" title={categoryName}>
          {categoryName}
        </div>
      )
    }
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      const priceText = price ? `${price.toLocaleString('vi-VN')} VNĐ` : "-"
      return (
        <div className="max-w-[120px] truncate" title={priceText}>
          {priceText}
        </div>
      )
    }
  },
  {
    accessorKey: "material",
    header: "Chất liệu",
    cell: ({ row }) => {
      const material = row.getValue("material") as string
      const materialText = material || "-"
      return (
        <div className="max-w-[120px] truncate" title={materialText}>
          {materialText}
        </div>
      )
    }
  },
  {
    accessorKey: "color",
    header: "Màu sắc",
    cell: ({ row }) => {
      const color = row.getValue("color") as string
      const colorText = color || "-"
      return (
        <div className="max-w-[100px] truncate" title={colorText}>
          {colorText}
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      const dateText = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date))
      
      return (
        <div className="max-w-[120px] truncate" title={dateText}>
          {dateText}
        </div>
      )
    }
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <ActionCell product={row.original} />
  }
]