import { motion } from 'framer-motion'
import { Leaf, TreePine, Hammer, Sparkles } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Hammer,
      title: "Thủ Công Truyền Thống",
      description: "Kế thừa tinh hoa nghề thủ công Việt Nam với kỹ thuật đan lát tinh xảo.",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: Leaf,
      title: "Bền Vững Tự Nhiên",
      description: "Sử dụng 100% nguyên liệu tự nhiên từ tre, nứa, rơm và gỗ được khai thác bền vững.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Sparkles,
      title: "Thiết Kế Hiện Đại",
      description: "Kết hợp phong cách truyền thống với xu hướng thiết kế đương đại, phù hợp mọi không gian.",
      color: "from-yellow-400 to-amber-500"
    },
    {
      icon: TreePine,
      title: "Chất Lượng Cao Cấp",
      description: "Từng sản phẩm được chăm chút tỉ mỉ, kiểm tra chất lượng nghiêm ngặt trước khi đến tay khách hàng.",
      color: "from-teal-400 to-green-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section className="relative py-16 overflow-hidden bg-green-700">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Section Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tại Sao Chọn{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                Kim Đạt
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center space-x-4 mb-6"
            >
              <div className="h-px bg-gradient-to-r from-amber-400 to-transparent flex-1 max-w-24" />
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-lg shadow-amber-400/50" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-green-100 leading-relaxed"
            >
              Khám phá những giá trị cốt lõi làm nên sự khác biệt của Kim Đạt trong việc tạo ra những sản phẩm nội thất độc đáo.
            </motion.p>
          </motion.div>

          {/* Right Column - Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="group"
                >
                  <motion.div 
                    className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 h-full transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon and Content in horizontal layout */}
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        variants={iconVariants}
                        initial="rest"
                        whileHover="hover"
                        className="flex-shrink-0"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center shadow-lg transition-shadow duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-green-100 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}