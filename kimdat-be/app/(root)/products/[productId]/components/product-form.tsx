"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload, type ImageItem } from "@/components/ui/image-upload"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Tên sản phẩm là bắt buộc.",
  }),
  description: z.string().optional(),
  price: z.string().optional().refine((val) => {
    if (!val || val === "") return true; // Allow empty values
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, {
    message: "Giá phải là số dương hợp lệ.",
  }),
  material: z.string().optional(),
  weavingStyle: z.string().optional(),
  color: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Danh mục là bắt buộc.",
  }),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData?: {
    id: string
    name: string
    description: string | null
    price: number | null
    material: string | null
    weavingStyle: string | null
    color: string | null
    categoryId: string
    images: Array<{
      id: string
      url: string
      alt: string | null
    }>
    category: {
      id: string
      name: string
    }
  } | null
  categories: Array<{
    id: string
    name: string
    description: string | null
  }>
  isEditing?: boolean
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  isEditing = false
}) => {
  const router = useRouter()
  const [productImages, setProductImages] = useState<ImageItem[]>([])

  // Load existing images on component mount
  useEffect(() => {
    if (initialData?.images) {
      const existingImages: ImageItem[] = initialData.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt || img.url,
      }))
      setProductImages(existingImages)
    }
  }, [initialData])

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price ? initialData.price.toString() : "",
      material: initialData?.material || "",
      weavingStyle: initialData?.weavingStyle || "",
      color: initialData?.color || "",
      categoryId: initialData?.categoryId || "",
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (data: ProductFormValues) => {
    try {

      // Validate that we have at least one image
      if (productImages.length === 0) {
        toast.error("Vui lòng chọn ít nhất một ảnh cho sản phẩm")
        return
      }

      // Process images: upload only new/changed images
      const processedImageUrls: string[] = []
      const imagesToUpload = productImages.filter(image => image.file && !image.id)
      const existingImages = productImages.filter(image => image.id && image.url && !image.file)
      
      // Keep existing images first (maintain order)
      for (const image of productImages) {
        if (image.id && image.url && !image.file) {
          // Existing image - keep the URL
          processedImageUrls.push(image.url)
        } else if (image.file) {
          // New image - upload it to the server
          try {
            const formData = new FormData()
            formData.append('file', image.file)
            
            const uploadResponse = await axios.post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            
            if (uploadResponse.data.success && uploadResponse.data.url) {
              processedImageUrls.push(uploadResponse.data.url)
            } else {
              throw new Error(uploadResponse.data.error || 'Upload failed')
            }
          } catch (uploadError: unknown) {
            let errorMessage = 'Upload failed'
            
            if (axios.isAxiosError(uploadError)) {
              errorMessage = uploadError.response?.data?.error || uploadError.message
            } else if (uploadError instanceof Error) {
              errorMessage = uploadError.message
            }
            
            toast.error(`Lỗi upload ảnh ${image.file.name}: ${errorMessage}`)
            return
          }
        }
      }

      // Check if images have changed (only send imageUrls if there are changes)
      let hasImageChanges = false
      
      if (imagesToUpload.length > 0) {
        hasImageChanges = true
      } else if (isEditing && initialData?.images) {
        // Check if existing images were removed
        const initialImageIds = initialData.images.map(img => img.id)
        const currentImageIds = existingImages.map(img => img.id).filter(Boolean)
        const removedImages = initialImageIds.filter(id => !currentImageIds.includes(id))
        
        if (removedImages.length > 0) {
          hasImageChanges = true
        } else if (currentImageIds.length !== initialImageIds.length) {
          hasImageChanges = true
        } else {
          // Check if image order changed
          const orderChanged = !initialImageIds.every((id, index) => id === currentImageIds[index])
          if (orderChanged) {
            hasImageChanges = true
          }
        }
      }
      
      const productData = {
        ...data,
        price: data.price && data.price !== "" ? parseFloat(data.price) : undefined,
        // Only include imageUrls if there are actual image changes
        ...(hasImageChanges && { imageUrls: processedImageUrls })
      }
      
      if (isEditing && initialData) {
        await axios.put(`/api/products/${initialData.id}`, productData)
        toast.success("Sản phẩm đã được cập nhật thành công!")
      } else {
        await axios.post("/api/products", productData)
        toast.success("Sản phẩm đã được tạo thành công!")
      }
      
      router.push("/products")
      router.refresh()
      
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} product:`, error)
      toast.error(`Có lỗi xảy ra khi ${isEditing ? 'cập nhật' : 'tạo'} sản phẩm. Vui lòng thử lại.`)
    }
  }

  const onCancel = () => {
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
          </h1>
          {isEditing && initialData && (
            <div className="mt-2 text-sm text-muted-foreground space-y-1">
              <p>ID: {initialData.id}</p>
              <p>Danh mục: {initialData.category.name}</p>
              <p>Tạo lúc: {new Date().toLocaleDateString('vi-VN')}</p>
            </div>
          )}
        </div>
        
        {/* Action buttons - visible only on large screens */}
        <div className="hidden lg:flex gap-2">
          <Button 
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Quay lại danh sách
          </Button>
          <Button 
            form="product-form"
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (isEditing ? "Đang cập nhật..." : "Đang tạo...") 
              : (isEditing ? "Cập nhật sản phẩm" : "Tạo sản phẩm")
            }
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Image Upload Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={productImages}
                onChange={setProductImages}
                maxFiles={5}
                maxSize={5 * 1024 * 1024} // 5MB
                accept="image/*"
                disabled={isSubmitting}
                label="Ảnh sản phẩm"
                description="Ảnh đầu tiên sẽ là ảnh bìa. Tối đa 5 ảnh, mỗi ảnh tối đa 5MB."
                required
              />
            </CardContent>
          </Card>
        </div>

        {/* Product Form Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form 
                  id="product-form"
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên sản phẩm *</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Nhập tên sản phẩm..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isSubmitting}
                            placeholder="Nhập mô tả sản phẩm..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá (VNĐ)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            min="0"
                            disabled={isSubmitting}
                            placeholder="0.00" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chất liệu</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Nhập chất liệu..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weavingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kiểu đan</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Nhập kiểu đan..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Màu sắc</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={isSubmitting}
                            placeholder="Nhập màu sắc..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Action Buttons - visible only on small screens */}
      <div className="lg:hidden flex flex-col gap-3 pt-4 border-t">
        <Button 
          form="product-form"
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting 
            ? (isEditing ? "Đang cập nhật..." : "Đang tạo...") 
            : (isEditing ? "Cập nhật sản phẩm" : "Tạo sản phẩm")
          }
        </Button>
        <Button 
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full"
        >
          Quay lại danh sách
        </Button>
      </div>
    </div>
  )
}