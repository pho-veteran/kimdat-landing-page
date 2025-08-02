import { Package } from 'lucide-react'

interface ErrorStateProps {
  error: string
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-24 flex items-center justify-center">
      <div className="text-center">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Không thể tải sản phẩm</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  )
} 