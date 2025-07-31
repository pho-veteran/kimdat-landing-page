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
import { Category } from "./column"
import { EditCategoryDialog } from "./edit-category-dialog"

interface ActionCellProps {
  category: Category
}

export const ActionCell: React.FC<ActionCellProps> = ({ category }) => {
  const router = useRouter()

  const handleCategoryUpdated = () => {
    router.refresh()
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/categories/${category.id}`)
      toast.success("Danh mục đã được xóa thành công!")
      router.refresh()
    } catch (error) {
      console.error("Error deleting category:", error)
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.error || "Có lỗi xảy ra khi xóa danh mục"
        : "Có lỗi xảy ra khi xóa danh mục"
      toast.error(errorMessage)
      throw error
    }
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
        <EditCategoryDialog 
          category={category}
          onSuccess={handleCategoryUpdated}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </DropdownMenuItem>
          }
        />
        <ConfirmDialog
          title="Xóa danh mục"
          description={`Bạn có chắc chắn muốn xóa danh mục "${category.name}"? Hành động này không thể hoàn tác.`}
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