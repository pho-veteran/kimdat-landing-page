// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiError {
  error: string;
  details?: Record<string, unknown> | string[];
}

// Product Types
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  material: string | null;
  weavingStyle: string | null;
  color: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: Category;
}

// API Response Types
export interface CategoriesResponse {
  success: true;
  data: Category[];
}

export interface CategoryWithProductsResponse {
  success: true;
  data: {
    category: Category;
    products: Product[];
  };
}

export interface ProductDetailResponse {
  success: true;
  data: {
    product: Product;
    relatedProducts: Product[];
  };
}

export interface RecentProductsResponse {
  success: true;
  data: Product[];
  meta: {
    count: number;
    limit: number;
  };
}