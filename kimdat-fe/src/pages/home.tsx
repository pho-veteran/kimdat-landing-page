import { HeroCarousel } from '../components/ui/hero-carousel'
import { AuroraText } from '../components/magicui/aurora-text'
import { BoxReveal } from '../components/magicui/box-reveal'
import { ChevronDown } from 'lucide-react'

export default function Home() {
  const scrollToIntro = () => {
    document.getElementById('intro-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen">
        <HeroCarousel
          autoPlay={true}
          autoPlayDelay={6000}
          backgroundImages={[
            // Forest craftsmanship
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=entropy&auto=format",
            // Wooden furniture workshop
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&crop=entropy&auto=format",
            // Bamboo and natural materials
            "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1920&h=1080&fit=crop&crop=entropy&auto=format"
          ]}
        >
          {[
            <div key="hero-content" className="text-center text-white px-8">
              <div className="bg-black/20 backdrop-blur-[2px] p-8 md:p-12 max-w-4xl mx-auto border border-white/10 rounded-sm">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white">
                  KIMDAT
                  <br />
                  <AuroraText
                    colors={["#22c55e", "#22c55e", "#16a34a", "#22c55e", "#10b981"]}
                    speed={1.5}
                    className="font-bold"
                  >
                    FOREST PRODUCTS
                  </AuroraText>
                </h1>
                <p className="text-lg md:text-xl text-white/95 mb-8 font-mono tracking-wider"
                  style={{
                    textShadow: '0 0 20px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9)'
                  }}>
                  “Chạm đến tự nhiên – Nâng tầm nội thất”
                </p>
                <button
                  onClick={scrollToIntro}
                  className="bg-white/25 hover:bg-white/35 backdrop-blur-md text-white border border-white/40 hover:border-white/60 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
                >
                  Khám phá thêm
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ]}
        </HeroCarousel>
      </section>

      {/* Introduction Section */}
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
                <div className="w-12 h-px bg-gray-300"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-12 h-px bg-gray-300"></div>
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
    </div>
  )
}
