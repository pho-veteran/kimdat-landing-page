import { BoxReveal } from '../magicui/box-reveal'

export function IntroSection() {
  return (
    <section
      id="intro-section"
      className="bg-white py-12 md:py-16 relative overflow-hidden"
      style={{
        position: 'relative',
      }}
    >
      {/* Background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/bamboo-pattern.jpg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '500px',
          filter: 'grayscale(1)',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Về Chúng Tôi
            </h2>
            {/* Decorative divider */}
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-300" />
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/30" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-300" />
            </div>
            <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed max-w-3xl mx-auto">
              <BoxReveal boxColor="#22c55e" duration={0.6}>
                <p>
                  <span className="font-semibold text-gray-800">Công ty TNHH Kim Đạt</span> là đơn vị chuyên sản xuất và cung cấp các sản phẩm nội thất thủ công từ <span className="text-green-600 font-medium">gỗ, tre, nứa, rơm</span>, vật liệu đan dây và nhựa giả mây.
                </p>
              </BoxReveal>
              <BoxReveal boxColor="#22c55e" duration={0.8}>
                <p>
                  Dù là một thương hiệu mới trên thị trường, chúng tôi mang theo khát vọng <span className="text-green-600 font-medium">gìn giữ tinh hoa thủ công Việt</span> và kết hợp cùng phong cách thiết kế hiện đại để tạo nên những sản phẩm <span className="font-medium text-gray-800">bền vững – tinh tế – đầy cảm hứng</span>.
                </p>
              </BoxReveal>
              <BoxReveal boxColor="#22c55e" duration={1}>
                <p>
                  Chúng tôi không chỉ tạo ra nội thất, mà còn <span className="text-green-600 font-medium">kiến tạo không gian sống gần gũi với thiên nhiên</span> – nơi vẻ đẹp mộc mạc hòa quyện cùng sự tiện nghi và phong cách riêng biệt của từng khách hàng.
                </p>
              </BoxReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}