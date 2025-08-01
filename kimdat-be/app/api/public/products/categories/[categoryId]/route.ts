import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface RouteParams {
  params: Promise<{
    categoryId: string
  }>
}

// GET - Fetch products by category for frontend
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { categoryId } = await params
    
    // Check if category exists
    const category = await prisma.productsCategory.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    // Get products in this category
    const products = await prisma.product.findMany({
      where: { categoryId },
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
      data: {
        category,
        products
      }
    })
  } catch (error) {
    console.error("Error fetching products by category:", error)
    
    return NextResponse.json(
      { error: "Failed to fetch products by category" },
      { status: 500 }
    )
  }
}