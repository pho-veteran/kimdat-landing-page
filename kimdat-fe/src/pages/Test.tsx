import { Button } from '@/components/ui/button'

export default function Test() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="KIM DAT Logo" 
                className="h-10 w-auto"
              />
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary">KIM DAT</div>
                <div className="text-sm text-muted-foreground">®</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Forest Products Traditional
              <span className="block text-primary mt-2">
                Bamboo & Handicrafts
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover our exquisite collection of sustainable bamboo products and traditional 
              handicrafts, crafted with care for nature and heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Explore Products
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose KIM DAT?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine traditional craftsmanship with sustainable practices to bring you 
              the finest bamboo and handicraft products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Sustainable</h3>
              <p className="text-muted-foreground">
                100% eco-friendly bamboo products that support environmental conservation.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Traditional</h3>
              <p className="text-muted-foreground">
                Handcrafted using time-honored techniques passed down through generations.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Quality</h3>
              <p className="text-muted-foreground">
                Premium materials and meticulous craftsmanship ensure lasting beauty and durability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Explore Our Collection?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the beauty of sustainable bamboo craftsmanship. Browse our full range 
              of products and find the perfect piece for your home or business.
            </p>
            <Button size="lg" className="px-8">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/logo.png" 
                  alt="KIM DAT Logo" 
                  className="h-8 w-auto"
                />
                <div className="text-xl font-bold text-primary">KIM DAT®</div>
              </div>
              <p className="text-muted-foreground text-sm">
                Forest Products Traditional Bamboo & Handicrafts
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Bamboo Furniture</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Home Decor</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kitchen Items</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 KIM DAT. All rights reserved. | Forest Products Traditional Bamboo & Handicrafts
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 