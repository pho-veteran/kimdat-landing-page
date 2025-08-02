import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import type { Product } from '@/types/api'

interface ProductPreviewCardProps {
  product: Product
  index: number
}

export default function ProductPreviewCard({ product, index }: ProductPreviewCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1
      }
    }
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group cursor-pointer bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* Product Image */}
      <div className="aspect-[3/2] overflow-hidden bg-gray-100 relative">
        {product.images?.[0] ? (
          <div className="w-full h-full overflow-hidden">
            <motion.img
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading={index < 6 ? "eager" : "lazy"}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50">
            <Leaf className="w-8 h-8 text-green-300" />
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
          >
            <ArrowRight className="w-4 h-4 text-green-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
          {product.name}
        </h3>
      </div>
    </motion.div>
  )
} 