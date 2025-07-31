"use client"

import { useRouter } from "next/navigation"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { columns } from "./column"
import { DataTable } from "./data-table"

interface ProductsClientProps {
  data: Array<{
    id: string
    name: string
    description: string | null
    price: number | null
    material: string | null
    weavingStyle: string | null
    color: string | null
    categoryId: string
    category: {
      id: string
      name: string
    }
    images: Array<{
      id: string
      url: string
      alt: string | null
    }>
    createdAt: Date
    updatedAt: Date
  }>
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const router = useRouter()

  const handleCreateProduct = () => {
    router.push('/products/new')
  }

  return (
    <div className="space-y-8">
      <Heading
        title="Sản phẩm"
        description="Quản lý các sản phẩm của bạn"
        action={
          <Button onClick={handleCreateProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm sản phẩm
          </Button>
        }
      />
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}