import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Fetch recently added products for frontend
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam) : 10 // Default to 10 products

    // Validate limit parameter
    if (limit > 50) {
      return NextResponse.json(
        { error: "Limit cannot exceed 50 products" },
        { status: 400 }
      )
    }

    const recentProducts = await prisma.product.findMany({
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
      },
      take: limit
    })

    return NextResponse.json({
      success: true,
      data: recentProducts,
      meta: {
        count: recentProducts.length,
        limit: limit
      }
    })
  } catch (error) {
    console.error("Error fetching recent products:", error)
    
    return NextResponse.json(
      { error: "Failed to fetch recent products" },
      { status: 500 }
    )
  }
}