"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { ActionCell } from "./action-cell" 

export type Category = {
  id: string
  name: string
  description: string | null
  coverImageUrl: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    products: number
  }
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "coverImageUrl",
    header: "Ảnh bìa",
    cell: ({ row }) => {
      const coverImageUrl = row.getValue("coverImageUrl") as string | null
      return coverImageUrl ? (
        <div className="w-12 h-12 relative rounded-md overflow-hidden">
          <Image
            src={coverImageUrl}
            alt={`Cover for ${row.getValue("name")}`}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      ) : (
        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return (
        <div className="max-w-[180px] truncate" title={name}>
          {name}
        </div>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      const descriptionText = description || "-"
      return (
        <div className="max-w-[360px] truncate" title={descriptionText}>
          {descriptionText}
        </div>
      )
    }
  },
  {
    accessorKey: "_count.products",
    header: "Số sản phẩm",
    cell: ({ row }) => {
      const count = row.original._count.products
      return count
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date
      return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(date))
    }
  },
  {
    id: "actions",
    header: "Thao tác",
    cell: ({ row }) => <ActionCell category={row.original} />
  }
]