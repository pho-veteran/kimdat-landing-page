import type {
  CategoriesResponse,
  CategoryWithProductsResponse,
  ProductDetailResponse,
  RecentProductsResponse,
  ApiError
} from '@/types/api';

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Generic API fetch wrapper
async function apiFetch<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// API Service Functions
export const apiService = {
  // Get all categories
  getCategories: (): Promise<CategoriesResponse> => {
    return apiFetch<CategoriesResponse>('/public/products/categories');
  },

  // Get products by category
  getProductsByCategory: (categoryId: string): Promise<CategoryWithProductsResponse> => {
    return apiFetch<CategoryWithProductsResponse>(`/public/products/categories/${categoryId}`);
  },

  // Get product details
  getProductById: (productId: string): Promise<ProductDetailResponse> => {
    return apiFetch<ProductDetailResponse>(`/public/products/${productId}`);
  },

  // Get recently added products
  getRecentProducts: (limit?: number): Promise<RecentProductsResponse> => {
    const url = limit ? `/public/products/recent?limit=${limit}` : '/public/products/recent';
    return apiFetch<RecentProductsResponse>(url);
  }
};

export default apiService;