import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const updateCategorySchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().optional(),
})

interface RouteParams {
  params: Promise<{
    categoryId: string
  }>
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { categoryId } = await params
    const body = await request.json()
    
    // Validate the request body
    const result = updateCategorySchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Dữ liệu không hợp lệ", 
          details: result.error.issues 
        },
        { status: 400 }
      )
    }

    const { name, description } = result.data

    // Check if category exists
    const existingCategory = await prisma.productsCategory.findUnique({
      where: { id: categoryId }
    })
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Không tìm thấy danh mục" },
        { status: 404 }
      )
    }

    // Check if another category with same name already exists (excluding current category)
    const duplicateCategory = await prisma.productsCategory.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        },
        id: {
          not: categoryId
        }
      }
    })
    
    if (duplicateCategory) {
      return NextResponse.json(
        { error: "Danh mục với tên này đã tồn tại" },
        { status: 409 }
      )
    }

    // Update category
    const updatedCategory = await prisma.productsCategory.update({
      where: { id: categoryId },
      data: {
        name,
        description: description || null
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: "Danh mục đã được cập nhật thành công"
    })

  } catch (error) {
    console.error("Error updating category:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi cập nhật danh mục" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { categoryId } = await params

    // Check if category exists
    const existingCategory = await prisma.productsCategory.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Không tìm thấy danh mục" },
        { status: 404 }
      )
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return NextResponse.json(
        { error: "Không thể xóa danh mục đang chứa sản phẩm" },
        { status: 400 }
      )
    }

    // Delete category
    await prisma.productsCategory.delete({
      where: { id: categoryId }
    })

    return NextResponse.json({
      success: true,
      message: "Danh mục đã được xóa thành công"
    })

  } catch (error) {
    console.error("Error deleting category:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xóa danh mục" },
      { status: 500 }
    )
  }
}
