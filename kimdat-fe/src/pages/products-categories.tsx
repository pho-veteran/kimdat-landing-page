import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService } from '@/services/api'
import type { Category, Product } from '@/types/api'
import { Package } from 'lucide-react'
import { CategorySection, LoadingSkeleton, ErrorState } from '@/components/products-categories'

interface CategoryWithProducts extends Category {
  products: Product[]
}

export default function ProductsCategoriesPage() {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<CategoryWithProducts[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        // First, get all categories
        const categoriesResponse = await apiService.getCategories()
        const categories = categoriesResponse.data

        // Then, fetch first 3 products for each category
        const categoriesWithProductsPromises = categories.map(async (category) => {
          try {
            const categoryProductsResponse = await apiService.getProductsByCategory(category.id)
            const products = categoryProductsResponse.data.products.slice(0, 3) // Take only first 3 products

            return {
              ...category,
              products
            }
          } catch (err) {
            console.error(`Failed to fetch products for category ${category.name}:`, err)
            return {
              ...category,
              products: []
            }
          }
        })

        const result = await Promise.all(categoriesWithProductsPromises)
        setCategoriesWithProducts(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories and products')
      } finally {
        setLoading(false)
      }
    }

    fetchCategoriesAndProducts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-24">
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/bamboo-pattern.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '600px',
          filter: 'grayscale(1)',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle geometric overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.015) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          >
            Sản Phẩm
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-4 mb-6"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Khám phá bộ sưu tập đa dạng các sản phẩm thủ công từ thiên nhiên,
            được phân loại theo từng danh mục để bạn dễ dàng tìm kiếm và lựa chọn.
          </motion.p>
        </motion.div>

        {/* Categories with Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {categoriesWithProducts.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
            />
          ))}
        </div>

        {/* Empty State */}
        {categoriesWithProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-gray-500">
              Chúng tôi đang cập nhật thêm sản phẩm mới. Vui lòng quay lại sau!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 