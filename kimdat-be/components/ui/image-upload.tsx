"use client"

import * as React from "react"
import Image from "next/image"
import { X, Upload, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface ImageItem {
  id?: string
  url?: string
  file?: File
  alt?: string
}

interface ImageUploadProps {
  value?: ImageItem[]
  onChange?: (images: ImageItem[]) => void
  maxFiles?: number
  maxSize?: number
  accept?: string
  disabled?: boolean
  className?: string
  label?: string
  description?: string
  required?: boolean
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  accept = "image/*",
  disabled = false,
  className,
  label,
  description,
  required = false,
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [objectUrls, setObjectUrls] = React.useState<Map<File, string>>(new Map())

  // Create object URLs for File objects
  React.useEffect(() => {
    const newObjectUrls = new Map<File, string>()
    value.forEach(item => {
      if (item.file && !objectUrls.has(item.file)) {
        newObjectUrls.set(item.file, URL.createObjectURL(item.file))
      }
    })
    
    if (newObjectUrls.size > 0) {
      setObjectUrls(prev => new Map([...prev, ...newObjectUrls]))
    }

    // Cleanup URLs for files that are no longer in value
    return () => {
      const currentFiles = new Set(value.filter(item => item.file).map(item => item.file!))
      objectUrls.forEach((url, file) => {
        if (!currentFiles.has(file)) {
          URL.revokeObjectURL(url)
          setObjectUrls(prev => {
            const next = new Map(prev)
            next.delete(file)
            return next
          })
        }
      })
    }
  }, [value, objectUrls])

  // Cleanup all object URLs on unmount
  React.useEffect(() => {
    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [objectUrls])

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return

    const newImages: ImageItem[] = []
    const filesArray = Array.from(files)

    filesArray.forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) return

      // Validate file size
      if (file.size > maxSize) return

      // Check if we haven't exceeded max files
      if (value.length + newImages.length >= maxFiles) return

      newImages.push({
        file,
        alt: file.name
      })
    })

    if (newImages.length > 0) {
      onChange?.([...value, ...newImages])
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files)
    // Reset input value to allow selecting the same file again
    event.target.value = ''
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    handleFileSelect(event.dataTransfer.files)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const removeImage = (index: number) => {
    if (disabled) return
    
    const imageToRemove = value[index]
    if (imageToRemove?.file && objectUrls.has(imageToRemove.file)) {
      URL.revokeObjectURL(objectUrls.get(imageToRemove.file)!)
      setObjectUrls(prev => {
        const next = new Map(prev)
        next.delete(imageToRemove.file!)
        return next
      })
    }

    const newImages = value.filter((_, i) => i !== index)
    onChange?.(newImages)
  }

  const getImageSrc = (image: ImageItem): string => {
    if (image.url) return image.url
    if (image.file && objectUrls.has(image.file)) {
      return objectUrls.get(image.file)!
    }
    return ''
  }

  const canAddMore = value.length < maxFiles

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 transition-colors",
            isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "opacity-50 pointer-events-none"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="mb-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Chọn ảnh
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {description || `Kéo thả hoặc click để chọn ảnh. Tối đa ${maxFiles} ảnh, mỗi ảnh tối đa ${Math.round(maxSize / (1024 * 1024))}MB.`}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={disabled}
          />
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((image, index) => {
            const imageSrc = getImageSrc(image)
            return (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden border bg-muted"
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={image.alt || `Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    unoptimized={!!image.file}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                
                {/* Delete Button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3" />
                </Button>

                {/* Cover Badge for first image */}
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Ảnh bìa
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Info Text */}
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {value.length} / {maxFiles} ảnh. Ảnh đầu tiên sẽ là ảnh bìa.
        </p>
      )}
    </div>
  )
}