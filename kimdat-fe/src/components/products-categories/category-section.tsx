import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Package } from 'lucide-react'
import type { Category, Product } from '@/types/api'
import { ProductPreviewCard } from '.' 

interface CategoryWithProducts extends Category {
  products: Product[]
}

interface CategorySectionProps {
  category: CategoryWithProducts
}

export default function CategorySection({ category }: CategorySectionProps) {
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

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Category Header - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Cover Image Column */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 overflow-hidden"
        >
          {category.coverImageUrl ? (
            <div className="w-full h-full overflow-hidden">
              <motion.img
                src={category.coverImageUrl}
                alt={`${category.name} cover`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center">
              <Leaf className="w-16 h-16 text-white/80" />
            </div>
          )}
        </motion.div>

        {/* Category Info Column */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-3"
          >
            {category.name}
          </motion.h2>
          
          {category.description && (
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-base leading-relaxed mb-4"
            >
              {category.description}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="flex items-center text-gray-500"
          >
            <Package className="w-5 h-5 mr-2" />
            <span className="text-base font-medium">{category._count.products} sản phẩm</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Products Section */}
      <div className="p-6 md:p-8 border-t border-gray-100">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            Sản phẩm nổi bật
          </h3>
          <div className="flex items-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors cursor-pointer">
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </motion.div>

        {/* Products Grid */}
        {category.products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {category.products.map((product, productIndex) => (
              <ProductPreviewCard
                key={product.id}
                product={product}
                index={productIndex}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
          >
            <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Chưa có sản phẩm trong danh mục này</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
} 