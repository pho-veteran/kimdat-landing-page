import { HeroCarousel } from '../components/ui/hero-carousel'
import { AuroraText } from '../components/magicui/aurora-text'
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
                  Khám Phá Thêm
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ]}
        </HeroCarousel>
      </section>

      {/* Intro Section */}
      <section id="intro-section" className="py-20 bg-gradient-to-br from-green-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Về KimDat Forest Products
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Chuyên Gia Về Sản Phẩm Gỗ Tự Nhiên
              </h3>
              <p className="text-gray-700 leading-relaxed">
                KimDat Forest Products là công ty hàng đầu trong lĩnh vực sản xuất các sản phẩm từ gỗ,
                tre, nứa và các vật liệu tự nhiên. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao,
                thân thiện với môi trường.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Với nhiều năm kinh nghiệm, chúng tôi chuyên sản xuất bàn ghế đan dây,
                sản phẩm nhựa giả mây, và các vật liệu tết bện truyền thống,
                kết hợp kỹ thuật hiện đại với thủ công truyền thống.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Năm Kinh Nghiệm</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600">Sản Phẩm</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">🌿</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Thân Thiện Môi Trường</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Sử dụng 100% nguyên liệu tự nhiên, không độc hại, có thể tái chế
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-amber-600 text-xl">🔨</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Thủ Công Tinh Tế</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Kết hợp kỹ thuật truyền thống với công nghệ hiện đại
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Chất Lượng Cao</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Kiểm soát chất lượng nghiêm ngặt từ nguyên liệu đến thành phẩm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
