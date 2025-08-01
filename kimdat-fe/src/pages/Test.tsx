import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeroCarousel } from '@/components/ui/hero-carousel'
import { apiService } from '@/services/api'
import type { Category, Product } from '@/types/api'

export default function Test() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryProducts, setCategoryProducts] = useState<{ category: Category | null, products: Product[] }>({ category: null, products: [] })
  const [productDetail, setProductDetail] = useState<{ product: Product | null, relatedProducts: Product[] }>({ product: null, relatedProducts: [] })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testGetCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getCategories()
      setCategories(response.data)
      console.log('Categories fetched:', response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const testGetProductsByCategory = async (categoryId?: string) => {
    try {
      setLoading(true)
      setError(null)
      // Use first category if no ID provided
      const id = categoryId || categories[0]?.id
      if (!id) {
        setError('No category ID available. Please fetch categories first.')
        return
      }
      const response = await apiService.getProductsByCategory(id)
      setCategoryProducts(response.data)
      console.log('Category products fetched:', response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch category products')
      console.error('Error fetching category products:', err)
    } finally {
      setLoading(false)
    }
  }

  const testGetProductById = async (productId?: string) => {
    try {
      setLoading(true)
      setError(null)
      // Use first product from category products if no ID provided
      const id = productId || categoryProducts.products[0]?.id
      if (!id) {
        setError('No product ID available. Please fetch category products first.')
        return
      }
      const response = await apiService.getProductById(id)
      setProductDetail(response.data)
      console.log('Product detail fetched:', response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch product detail')
      console.error('Error fetching product detail:', err)
    } finally {
      setLoading(false)
    }
  }

  const testGetRecentProducts = async (limit?: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.getRecentProducts(limit)
      setRecentProducts(response.data)
      console.log('Recent products fetched:', response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recent products')
      console.error('Error fetching recent products:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header - Clean Modern Navigation */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <div className="text-2xl font-bold text-primary">KIM DAT</div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <Button className="ml-4">Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Carousel - Full Viewport Height with Shared Content */}
      <section className="h-screen">
        <HeroCarousel 
          autoPlay={true} 
          autoPlayDelay={4000}
          backgroundImages={[
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&crop=entropy&auto=format", // Modern Cityscape
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop&crop=entropy&auto=format", // Ocean & Waves
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=entropy&auto=format", // Mountain Landscape
            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop&crop=entropy&auto=format", // Desert Dunes
            "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=entropy&auto=format", // Technology Circuit
          ]}
        >
          {[
            /* Single shared content that appears on all slides */
            <div key="shared-content" className="text-center text-white px-8 max-w-4xl">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                ✨ Experience Innovation
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to
                <span className="block text-green-400 mt-2">KIM DAT</span>
              </h1>
              <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Discover amazing landscapes and cutting-edge solutions across diverse environments and technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-3 bg-white text-green-600 hover:bg-gray-100">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 border-white text-white hover:bg-white hover:text-green-600">
                  Learn More
                </Button>
              </div>
            </div>
          ]}
        </HeroCarousel>
      </section>

      {/* Typography & Text Demo */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-4">Typography Showcase</h2>
            <p className="text-muted-foreground mb-12">Demonstrating our green-focused text with modern typography</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Heading Large</h3>
                  <p className="text-foreground">Main content text in our signature green color</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Heading Medium</h4>
                  <p className="text-muted-foreground">Secondary text in muted tones for better hierarchy</p>
                </div>
              <div>
                  <h5 className="text-base font-medium text-foreground mb-2">Heading Small</h5>
                  <p className="text-sm text-muted-foreground">Small text maintaining readability</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Card Component</h3>
                  <p className="text-muted-foreground text-sm">Cards use consistent foreground colors with subtle backgrounds</p>
                </div>
                <div className="p-6 bg-secondary rounded-lg">
                  <h3 className="text-lg font-semibold text-secondary-foreground mb-2">Secondary Card</h3>
                  <p className="text-muted-foreground text-sm">Alternative styling with secondary colors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Components Demo */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Interactive Elements</h2>
            <p className="text-muted-foreground mb-12">Components with hover states and focus rings</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="group p-8 border border-border rounded-lg hover:border-primary transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Modern Design
                </h3>
                <p className="text-muted-foreground text-sm">
                  Clean, minimal interface with focus on content and usability
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="group p-8 border border-border rounded-lg hover:border-primary transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  User Focused
                </h3>
                <p className="text-muted-foreground text-sm">
                  Green accents guide attention without overwhelming the interface
                </p>
            </div>

              {/* Feature Card 3 */}
              <div className="group p-8 border border-border rounded-lg hover:border-primary transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <svg className="w-6 h-6 text-primary group-hover:text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Accessible
                </h3>
                <p className="text-muted-foreground text-sm">
                  High contrast ratios ensure excellent readability for all users
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Mode Preview */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Dark Mode Ready</h2>
            <p className="text-background/70 mb-12">
              The color system automatically adapts for dark mode with proper contrast ratios
            </p>
            
            <div className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-8 text-left">
                <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Dark Mode Example</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Primary text remains green-focused</div>
                    <div className="text-sm text-background/70">With proper contrast for dark backgrounds</div>
                  </div>
                </div>
                <div className="pl-11">
                  <div className="bg-background/10 border border-background/20 rounded p-3 text-sm">
                    Dark mode automatically adjusts all color values while maintaining the green identity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Experience the New Design?
            </h2>
            <p className="text-muted-foreground mb-8">
              This modern color system provides better readability, accessibility, and visual hierarchy while maintaining brand identity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Explore More
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                View Documentation
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* API Testing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">API Testing</h2>
            
            {/* API Controls */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex flex-wrap gap-4 mb-4">
                <Button onClick={testGetCategories} disabled={loading}>
                  {loading ? 'Loading...' : 'Test Get Categories'}
                </Button>
                <Button onClick={() => testGetProductsByCategory()} disabled={loading || categories.length === 0}>
                  Test Get Products by Category
                </Button>
                <Button onClick={() => testGetProductById()} disabled={loading || categoryProducts.products.length === 0}>
                  Test Get Product Detail
                </Button>
                <Button onClick={() => testGetRecentProducts()} disabled={loading}>
                  Test Get Recent Products
                </Button>
                <Button onClick={() => testGetRecentProducts(5)} disabled={loading}>
                  Get Recent (5 items)
                </Button>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                  <strong>Error:</strong> {error}
                </div>
              )}
            </div>

            {/* API Results */}
            <div className="space-y-6">
              {/* Categories Results */}
              {categories.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Categories ({categories.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category.id} className="border border-gray-200 p-4 rounded">
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        <p className="text-xs text-gray-500">{category._count.products} products</p>
                        <Button 
                          size="sm" 
                          className="mt-2" 
                          onClick={() => testGetProductsByCategory(category.id)}
                        >
                          Get Products
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Products Results */}
              {categoryProducts.category && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">
                    Products in "{categoryProducts.category.name}" ({categoryProducts.products.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.products.map((product) => (
                      <div key={product.id} className="border border-gray-200 p-4 rounded">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        {product.price && (
                          <p className="text-sm font-semibold text-green-600">
                            {product.price.toLocaleString('vi-VN')} VND
                          </p>
                        )}
                        <p className="text-xs text-gray-500">{product.images.length} images</p>
                        <Button 
                          size="sm" 
                          className="mt-2" 
                          onClick={() => testGetProductById(product.id)}
                        >
                          Get Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Detail Results */}
              {productDetail.product && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Product Detail</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">{productDetail.product.name}</h4>
                      <p className="text-gray-600 mb-4">{productDetail.product.description}</p>
                      {productDetail.product.price && (
                        <p className="text-xl font-bold text-green-600 mb-4">
                          {productDetail.product.price.toLocaleString('vi-VN')} VND
                        </p>
                      )}
                      <div className="space-y-2 text-sm">
                        {productDetail.product.material && <p><strong>Material:</strong> {productDetail.product.material}</p>}
                        {productDetail.product.weavingStyle && <p><strong>Weaving Style:</strong> {productDetail.product.weavingStyle}</p>}
                        {productDetail.product.color && <p><strong>Color:</strong> {productDetail.product.color}</p>}
                        <p><strong>Category:</strong> {productDetail.product.category.name}</p>
                        <p><strong>Images:</strong> {productDetail.product.images.length}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Related Products ({productDetail.relatedProducts.length})</h5>
                      <div className="space-y-2">
                        {productDetail.relatedProducts.map((related) => (
                          <div key={related.id} className="border border-gray-100 p-2 rounded text-sm">
                            <p className="font-medium">{related.name}</p>
                            {related.price && (
                              <p className="text-green-600">{related.price.toLocaleString('vi-VN')} VND</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Products Results */}
              {recentProducts.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Recent Products ({recentProducts.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="border border-gray-200 p-4 rounded">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                        {product.price && (
                          <p className="text-sm font-semibold text-green-600">
                            {product.price.toLocaleString('vi-VN')} VND
                          </p>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          <p>Category: {product.category.name}</p>
                          <p>Images: {product.images.length}</p>
                          <p>Added: {new Date(product.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-2" 
                          onClick={() => testGetProductById(product.id)}
                        >
                          Get Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/20 border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <div className="text-lg font-bold text-primary">KIM DAT</div>
              <span className="text-muted-foreground text-sm">Design System Demo</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Modern • Accessible • Green-Focused
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 