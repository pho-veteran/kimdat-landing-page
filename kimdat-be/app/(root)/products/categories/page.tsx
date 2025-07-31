import prisma from "@/lib/prisma"
import { CategoriesClient } from "./components/client"

export default async function CategoriesPage() {
  const categories = await prisma.productsCategory.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CategoriesClient data={categories} />
    </div>
  )
}
