import prisma from "@/lib/prisma"
import { ProductsClient } from "./components/client" 

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: true,
      images: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductsClient data={products} />
    </div>
  )
}
