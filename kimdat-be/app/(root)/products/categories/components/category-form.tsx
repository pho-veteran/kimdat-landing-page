"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên danh mục là bắt buộc.",
  }),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: {
    id: string
    name: string
    description: string | null
  }
  onSuccess?: () => void
  onCancel?: () => void
  isEditing?: boolean
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
  isEditing = false
}) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (isEditing && initialData) {
        await axios.put(`/api/products/categories/${initialData.id}`, data)
        toast.success("Danh mục đã được cập nhật thành công!")
      } else {
        await axios.post("/api/products/categories", data)
        toast.success("Danh mục đã được tạo thành công!")
      }
      form.reset()
      onSuccess?.()
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} category:`, error)
      toast.error(`Có lỗi xảy ra khi ${isEditing ? 'cập nhật' : 'tạo'} danh mục. Vui lòng thử lại.`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input 
                  disabled={isSubmitting}
                  placeholder="Nhập tên danh mục..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả (tùy chọn)</FormLabel>
              <FormControl>
                <Input 
                  disabled={isSubmitting}
                  placeholder="Nhập mô tả danh mục..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting 
              ? (isEditing ? "Đang cập nhật..." : "Đang tạo...") 
              : (isEditing ? "Cập nhật danh mục" : "Tạo danh mục")
            }
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Hủy
          </Button>
        </div>
      </form>
    </Form>
  )
}