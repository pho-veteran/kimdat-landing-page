"use client"

import { useState } from "react"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CategoryForm } from "./category-form"
import { Category } from "./column"

interface EditCategoryDialogProps {
  category: Category
  onSuccess?: () => void
  trigger?: React.ReactNode
}

export const EditCategoryDialog: React.FC<EditCategoryDialogProps> = ({
  category,
  onSuccess,
  trigger
}) => {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
    onSuccess?.()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin danh mục. Nhập thông tin mới bên dưới và nhấn cập nhật.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm 
          initialData={category}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  )
}