import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const updateProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  description: z.string().optional(),
  price: z.number().min(0, "Giá phải là số dương").optional(),
  material: z.string().optional(),
  weavingStyle: z.string().optional(),
  color: z.string().optional(),
  categoryId: z.string().min(1, "Danh mục là bắt buộc"),
  imageUrls: z.array(z.string()).optional(),
})

interface RouteParams {
  params: Promise<{
    productId: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId } = await params
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        category: true
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy thông tin sản phẩm" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId } = await params
    const body = await request.json()
    
    // Validate the request body
    const result = updateProductSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Dữ liệu không hợp lệ", 
          details: result.error.issues 
        },
        { status: 400 }
      )
    }

    const { name, description, price, material, weavingStyle, color, categoryId, imageUrls } = result.data

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true }
    })
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      )
    }

    // Check if category exists
    const category = await prisma.productsCategory.findUnique({
      where: { id: categoryId }
    })
    
    if (!category) {
      return NextResponse.json(
        { error: "Danh mục không tồn tại" },
        { status: 404 }
      )
    }

    // Update product with transaction to handle images
    const updatedProduct = await prisma.$transaction(async (tx) => {
      // If imageUrls are provided, delete existing images and create new ones
      if (imageUrls && imageUrls.length > 0) {
        await tx.productImage.deleteMany({
          where: { productId }
        })
      }

      return await tx.product.update({
        where: { id: productId },
        data: {
          name,
          description: description || null,
          price: price || null,
          material: material || null,
          weavingStyle: weavingStyle || null,
          color: color || null,
          categoryId,
          images: imageUrls && imageUrls.length > 0 ? {
            create: imageUrls.map((url, index) => ({
              url,
              alt: `${name} - Ảnh ${index + 1}`
            }))
          } : undefined
        },
        include: {
          images: true,
          category: true
        }
      })
    })

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Sản phẩm đã được cập nhật thành công"
    })

  } catch (error) {
    console.error("Error updating product:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật sản phẩm" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { productId } = await params
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (!product) {
      return NextResponse.json(
        { error: "Sản phẩm không tồn tại" },
        { status: 404 }
      )
    }

    // Delete product (cascade will handle images)
    await prisma.product.delete({
      where: { id: productId }
    })

    return NextResponse.json({
      success: true,
      message: "Sản phẩm đã được xóa thành công"
    })

  } catch (error) {
    console.error("Error deleting product:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xóa sản phẩm" },
      { status: 500 }
    )
  }
}