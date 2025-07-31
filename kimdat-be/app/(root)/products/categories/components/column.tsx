"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActionCell } from "./action-cell" 

export type Category = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    products: number
  }
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Tên danh mục",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return description ? description : "-"
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