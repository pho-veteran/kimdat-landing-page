"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { Product } from "./column"

interface ActionCellProps {
  product: Product
}

export const ActionCell: React.FC<ActionCellProps> = ({ product }) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${product.id}`)
      toast.success("Sản phẩm đã được xóa thành công!")
      router.refresh()
    } catch (error) {
      console.error("Error deleting product:", error)
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.error || "Có lỗi xảy ra khi xóa sản phẩm"
        : "Có lỗi xảy ra khi xóa sản phẩm"
      toast.error(errorMessage)
      throw error
    }
  }

  const handleEdit = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </DropdownMenuItem>
        <ConfirmDialog
          title="Xóa sản phẩm"
          description={`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`}
          confirmText="Xóa"
          cancelText="Hủy"
          variant="destructive"
          onConfirm={handleDelete}
        >
          <DropdownMenuItem 
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Trash className="mr-2 h-4 w-4" />
            Xóa
          </DropdownMenuItem>
        </ConfirmDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}