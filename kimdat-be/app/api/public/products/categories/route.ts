import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET - Fetch all categories for frontend
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
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}