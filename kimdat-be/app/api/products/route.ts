import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"

const createProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  description: z.string().optional(),
  price: z.number().min(0, "Giá phải là số dương").optional(),
  material: z.string().optional(),
  weavingStyle: z.string().optional(),
  color: z.string().optional(),
  categoryId: z.string().min(1, "Danh mục là bắt buộc"),
  imageUrls: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const result = createProductSchema.safeParse(body)
    
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

    // Create new product
    const newProduct = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: price || null,
        material: material || null,
        weavingStyle: weavingStyle || null,
        color: color || null,
        categoryId,
        images: imageUrls ? {
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

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Sản phẩm đã được tạo thành công"
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating product:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tạo sản phẩm" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi lấy danh sách sản phẩm" },
      { status: 500 }
    )
  }
}