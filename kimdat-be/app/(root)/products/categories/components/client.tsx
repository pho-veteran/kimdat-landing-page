"use client"

import { useRouter } from "next/navigation"
import { Heading } from "@/components/heading"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { CategoryDialog } from "./category-dialog"

interface CategoriesClientProps {
  data: Array<{
    id: string
    name: string
    description: string | null
    coverImageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: {
      products: number
    }
  }>
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const router = useRouter()

  const handleCategoryCreated = () => {
    router.refresh()
  }

  return (
    <div className="space-y-8">
      <Heading
        title="Danh mục sản phẩm"
        description="Quản lý các danh mục sản phẩm của bạn"
        action={
          <CategoryDialog onSuccess={handleCategoryCreated} />
        }
      />
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}