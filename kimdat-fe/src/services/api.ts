import type {
  CategoriesResponse,
  CategoryWithProductsResponse,
  ProductDetailResponse,
  RecentProductsResponse,
  ApiError,
  Product,
  ProductImage,
  Category
} from '@/types/api';

// Get API base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Utility function to process image URLs
function processImageUrl(url: string | null): string | null {
  if (!url) return null;
  
  // If URL is already absolute (starts with http/https), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If URL starts with /, it's relative to the API base URL
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }
  
  // Otherwise, assume it's a relative path and add API base URL with /
  return `${API_BASE_URL}/${url}`;
}

// Process images
function processImages(images: ProductImage[]): ProductImage[] {
  return images.map(image => ({
    ...image,
    url: processImageUrl(image.url) || image.url
  }));
}

// Process category cover image
function processCategory(category: Category): Category {
  return {
    ...category,
    coverImageUrl: processImageUrl(category.coverImageUrl)
  };
}

// Process product data
function processProduct(product: Product): Product {
  return {
    ...product,
    images: processImages(product.images),
    category: processCategory(product.category)
  };
}

// Process multiple products
function processProducts(products: Product[]): Product[] {
  return products.map(processProduct);
}

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
  getCategories: async (): Promise<CategoriesResponse> => {
    const response = await apiFetch<CategoriesResponse>('/public/products/categories');
    return {
      ...response,
      data: response.data.map(processCategory)
    };
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string): Promise<CategoryWithProductsResponse> => {
    const response = await apiFetch<CategoryWithProductsResponse>(`/public/products/categories/${categoryId}`);
    return {
      ...response,
      data: {
        category: processCategory(response.data.category),
        products: processProducts(response.data.products)
      }
    };
  },

  // Get product details
  getProductById: async (productId: string): Promise<ProductDetailResponse> => {
    const response = await apiFetch<ProductDetailResponse>(`/public/products/${productId}`);
    return {
      ...response,
      data: {
        product: processProduct(response.data.product),
        relatedProducts: processProducts(response.data.relatedProducts)
      }
    };
  },

  // Get recently added products
  getRecentProducts: async (limit?: number): Promise<RecentProductsResponse> => {
    const url = limit ? `/public/products/recent?limit=${limit}` : '/public/products/recent';
    const response = await apiFetch<RecentProductsResponse>(url);
    return {
      ...response,
      data: processProducts(response.data)
    };
  },

  // Utility function to process image URL (exposed for external use)
  processImageUrl
};

export default apiService;