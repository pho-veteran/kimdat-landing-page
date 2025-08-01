import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

interface RouteParams {
  params: Promise<{
    productId: string
  }>
}

// GET - Fetch specific product for frontend
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
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Optional: Get related products from the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: {
          not: productId
        }
      },
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: 'asc'
          }
        },
        category: true
      },
      take: 4,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}