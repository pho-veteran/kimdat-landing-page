import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { apiService } from '@/services/api'
import type { Product } from '@/types/api'
import { ArrowRight, Leaf } from 'lucide-react'

export function ProductsPreviewSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await apiService.getRecentProducts(8)
        setProducts(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
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

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden h-full flex flex-col">
      {/* Skeleton Image */}
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />

      {/* Skeleton Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Skeleton Title */}
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>

        {/* Skeleton Badge */}
        <div className="mt-auto">
          <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden border-t border-gray-200">
        {/* Background pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/bamboo-pattern.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '600px',
            filter: 'grayscale(1)',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        />

        {/* Subtle geometric overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.02) 0%, transparent 50%)
            `,
          }}
        />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-200 rounded animate-pulse mb-4 max-w-md mx-auto" />
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-px bg-gray-200" />
              <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-16 h-px bg-gray-200" />
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse max-w-2xl mx-auto mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse max-w-lg mx-auto" />
          </div>

          {/* Skeleton grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center text-gray-600">
            <p>Không thể tải sản phẩm. Vui lòng thử lại sau.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden border-t border-gray-200">
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/bamboo-pattern.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '600px',
          filter: 'grayscale(1)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle geometric overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.02) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating leaf decorations */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-green-300/40 z-0"
      >
        <Leaf size={32} />
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [0, -3, 0, 3, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-16 text-green-300/30 z-0"
      >
        <Leaf size={24} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Sản Phẩm Mới Nhất
          </motion.h2>

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
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Khám phá những sản phẩm thủ công mới nhất từ thiên nhiên,
            được chế tác tỉ mỉ để mang đến vẻ đẹp mộc mạc cho không gian sống của bạn.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Product Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                {product.images?.[0] ? (
                  <motion.img
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-[1px] transition-all duration-500"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50">
                    <Leaf className="w-12 h-12 text-green-300" />
                  </div>
                )}



                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5 text-green-600" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors duration-200 flex-1">
                  {product.name}
                </h3>

                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {product.category.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="relative inline-block">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-50 to-green-100 rounded-full transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-full transform -rotate-1"></div>

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-white border-2 border-green-200 hover:border-green-300 text-green-700 hover:text-green-800 px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group pointer cursor-pointer"
            >
              <span className="relative z-10">Khám Phá Thêm Sản Phẩm</span>

              {/* Animated arrow container */}
              <div className="relative z-10 flex items-center">
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  whileHover={{ x: 4, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                <motion.div
                  initial={{ x: -4, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="absolute"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                <div className="w-5 h-5 opacity-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Hover gradient overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-green-100/50 rounded-full"
              />
            </motion.button>

            {/* Floating leaf decoration */}
            <motion.div
              animate={{
                y: [-2, 2, -2],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2 text-green-400/60"
            >
              <Leaf size={16} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}