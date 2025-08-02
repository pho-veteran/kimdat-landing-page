import { Skeleton } from '@/components/ui/skeleton'

// Skeleton Components
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div className="aspect-[3/2] bg-gray-200 animate-pulse" />
    <div className="p-3">
      <Skeleton className="h-3 w-3/4 mb-1" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
)

const CategorySectionSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    {/* Category Header - Two Column Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
      {/* Cover Image Skeleton */}
      <div className="lg:col-span-1">
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      </div>
      
      {/* Category Info Skeleton */}
      <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center">
        <Skeleton className="h-8 w-64 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
    
    {/* Products Section Skeleton */}
    <div className="p-6 md:p-8 border-t border-gray-100">
      {/* Section Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(3)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
)

export default function LoadingSkeleton() {
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto mb-6" />
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-px bg-gray-300" />
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <div className="w-16 h-px bg-gray-300" />
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {[...Array(4)].map((_, i) => (
            <CategorySectionSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
} 