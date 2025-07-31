import prisma from "@/lib/prisma"
import { ProductForm } from "./components/product-form"
import { ObjectId } from "mongodb"

interface ProductPageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params

  let product = null
  if (productId !== 'new' && ObjectId.isValid(productId)) {
    product = await prisma.product.findUnique({
      where: {
        id: productId
      },
      include: {
        images: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        category: true
      }
    })
  }

  const categories = await prisma.productsCategory.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ProductForm 
        initialData={product}
        categories={categories}
        isEditing={productId !== 'new' && product !== null}
      />
    </div>
  )
}
