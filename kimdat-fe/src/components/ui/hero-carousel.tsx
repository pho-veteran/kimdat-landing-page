import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroCarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayDelay?: number
  showIndicators?: boolean
  showNavigationButtons?: boolean
  backgroundImages: string[]
}

export const HeroCarousel = ({
  children,
  className,
  autoPlay = false,
  autoPlayDelay = 5000,
  showIndicators = true,
  showNavigationButtons = true,
  backgroundImages,
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const [isHovered, setIsHovered] = React.useState(false)
  const totalSlides = backgroundImages.length

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying || totalSlides <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, autoPlayDelay)

    return () => clearInterval(interval)
  }, [isPlaying, totalSlides, autoPlayDelay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const handleMouseEnter = () => {
    if (autoPlay) setIsPlaying(false)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (autoPlay) setIsPlaying(true)
    setIsHovered(false)
  }

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background images container that slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {backgroundImages.map((backgroundImage, index) => (
          <div
            key={index}
            className="min-w-full h-full relative"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>
      
      {/* Fixed centered content that doesn't move */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children[0]}
      </div>

      {/* Navigation Buttons */}
      {showNavigationButtons && totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-20",
              "bg-black/50 hover:bg-black/70 text-white",
              "rounded-full p-2 transition-all duration-300 ease-out",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50",
              isHovered 
                ? "opacity-100 left-4 translate-x-0" 
                : "opacity-0 -left-8 -translate-x-4"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-20",
              "bg-black/50 hover:bg-black/70 text-white",
              "rounded-full p-2 transition-all duration-300 ease-out",
              "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50",
              isHovered 
                ? "opacity-100 right-4 translate-x-0" 
                : "opacity-0 -right-8 translate-x-4"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 z-20 flex space-x-2",
          "transition-all duration-300 ease-out",
          isHovered 
            ? "opacity-100 bottom-6 translate-y-0" 
            : "opacity-0 -bottom-2 translate-y-4"
        )}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-white/50",
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
