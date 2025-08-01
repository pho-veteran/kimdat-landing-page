"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"

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
import { ImageUpload, ImageItem } from "@/components/ui/image-upload"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên danh mục là bắt buộc.",
  }),
  description: z.string().optional(),
  coverImageUrl: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: {
    id: string
    name: string
    description: string | null
    coverImageUrl: string | null
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
  const [coverImages, setCoverImages] = useState<ImageItem[]>(
    initialData?.coverImageUrl 
      ? [{ url: initialData.coverImageUrl }] 
      : []
  )

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      coverImageUrl: initialData?.coverImageUrl || "",
    },
  })

  const { isSubmitting } = form.formState

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    return response.data.url
  }

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      let coverImageUrl = data.coverImageUrl

      // Handle image upload if there's a new file
      const newImageFile = coverImages.find(img => img.file)
      if (newImageFile?.file) {
        coverImageUrl = await uploadImage(newImageFile.file)
      } else if (coverImages.length === 0) {
        // If no images selected, set to null
        coverImageUrl = ""
      } else if (coverImages[0]?.url) {
        // If existing image URL, keep it
        coverImageUrl = coverImages[0].url
      }

      const submitData = {
        ...data,
        coverImageUrl
      }

      if (isEditing && initialData) {
        await axios.put(`/api/products/categories/${initialData.id}`, submitData)
        toast.success("Danh mục đã được cập nhật thành công!")
      } else {
        await axios.post("/api/products/categories", submitData)
        toast.success("Danh mục đã được tạo thành công!")
      }
      form.reset()
      setCoverImages([])
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Ảnh bìa danh mục (tùy chọn)</label>
          <ImageUpload
            value={coverImages}
            onChange={setCoverImages}
            maxFiles={1}
            disabled={isSubmitting}
            label=""
            description="Chọn ảnh bìa cho danh mục. Kích thước khuyến nghị: 400x300px"
          />
        </div>

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