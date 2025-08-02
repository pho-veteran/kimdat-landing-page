import { HeroCarousel } from '../ui/hero-carousel'
import { AuroraText } from '../magicui/aurora-text'
import { ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  onScrollToIntro: () => void
}

export function HeroSection({ onScrollToIntro }: HeroSectionProps) {
  return (
    <section className="h-screen">
      <HeroCarousel
        autoPlay={true}
        autoPlayDelay={6000}
        backgroundImages={[
          // Forest craftsmanship
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=entropy&auto=format",
          // Hay bales
          "https://images.unsplash.com/photo-1632773633996-1e87efd1a927?q=80&w=1170&auto=format",
          // Bamboo and natural materials
          "https://images.unsplash.com/photo-1426020744253-568cd6345e93?q=80&w=1170&auto=format"
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
                "Chạm đến tự nhiên – Nâng tầm nội thất"
              </p>
              <button
                onClick={onScrollToIntro}
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
  )
}