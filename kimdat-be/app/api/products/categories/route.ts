import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const createCategorySchema = z.object({
  name: z.string().min(1, "Tên danh mục là bắt buộc"),
  description: z.string().optional(),
  coverImageUrl: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const result = createCategorySchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Dữ liệu không hợp lệ", 
          details: result.error.issues 
        },
        { status: 400 }
      )
    }

    const { name, description, coverImageUrl } = result.data

    // Check if category with same name already exists
    const existingCategory = await prisma.productsCategory.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })
    
    if (existingCategory) {
      return NextResponse.json(
        { error: "Danh mục với tên này đã tồn tại" },
        { status: 409 }
      )
    }

    // Create new category
    const newCategory = await prisma.productsCategory.create({
      data: {
        name,
        description: description || null,
        coverImageUrl: coverImageUrl || null
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
      data: newCategory,
      message: "Danh mục đã được tạo thành công"
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating category:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo danh mục" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const categories = await prisma.productsCategory.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy danh sách danh mục" },
      { status: 500 }
    )
  }
}