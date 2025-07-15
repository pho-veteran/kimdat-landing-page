import { Button } from '@/components/ui/button'

export default function Test() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border/20 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo.png" 
                alt="KIM DAT Logo" 
                className="h-12 w-auto"
              />
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-primary tracking-wide">KIM DAT</div>
                <div className="text-xs text-muted-foreground font-light">®</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-12">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide uppercase">
                Products
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide uppercase">
                About
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors tracking-wide uppercase">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-12 lg:col-span-8">
                <div className="mb-6">
                  <span className="text-6xl font-thin text-primary/30 tracking-wider">01</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
                  <span className="block uppercase tracking-wider font-black">
                    FOREST PRODUCTS
                  </span>
                  <span className="block uppercase tracking-wider font-black text-primary mt-2">
                    TRADITIONAL BAMBOO
                  </span>
                  <span className="block text-2xl md:text-3xl font-light text-muted-foreground mt-4 normal-case tracking-normal">
                    & Handicrafts
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light">
                  Discover our exquisite collection of sustainable bamboo products and traditional 
                  handicrafts, crafted with care for nature and heritage.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button size="lg" className="px-12 py-4 text-sm font-medium uppercase tracking-wider rounded-none border-2 border-primary bg-primary hover:bg-primary/90 transition-all">
                    Explore Products
                  </Button>
                  <Button variant="outline" size="lg" className="px-12 py-4 text-sm font-medium uppercase tracking-wider rounded-none border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-none border border-border/20"></div>
                  <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <div className="flex items-center gap-8 mb-8">
              <span className="text-6xl font-thin text-primary/30 tracking-wider">02</span>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-wider">
                  Why Choose
                </h2>
                <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-wider">
                  KIM DAT?
                </h2>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl font-light leading-relaxed">
              We combine traditional craftsmanship with sustainable practices to bring you 
              the finest bamboo and handicraft products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="border-l-4 border-primary pl-8 py-8 bg-card/50 hover:bg-card transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Sustainable</h3>
                  <div className="w-12 h-12 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed">
                  100% eco-friendly bamboo products that support environmental conservation and sustainable practices.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border-l-4 border-primary pl-8 py-8 bg-card/50 hover:bg-card transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Traditional</h3>
                  <div className="w-12 h-12 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 11.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Handcrafted using time-honored techniques passed down through generations of skilled artisans.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border-l-4 border-primary pl-8 py-8 bg-card/50 hover:bg-card transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Quality</h3>
                  <div className="w-12 h-12 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Premium materials and meticulous craftsmanship ensure lasting beauty and exceptional durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl font-thin text-primary/30 tracking-wider">03</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-wider">
              Ready to Explore
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 uppercase tracking-wider">
              Our Collection?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Discover the beauty of sustainable bamboo craftsmanship. Browse our full range 
              of products and find the perfect piece for your home or business.
            </p>
            <Button size="lg" className="px-16 py-4 text-sm font-medium uppercase tracking-wider rounded-none border-2 border-primary bg-primary hover:bg-primary/90 transition-all">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/30 border-t border-border/20 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo.png" 
                  alt="KIM DAT Logo" 
                  className="h-10 w-auto"
                />
                <div className="text-xl font-bold text-primary tracking-wide">KIM DAT®</div>
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                Forest Products Traditional<br />
                Bamboo & Handicrafts
              </p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Products</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li><a href="#" className="hover:text-primary transition-colors">Bamboo Furniture</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Home Decor</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kitchen Items</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Garden Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm">Connect</h4>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                <li><a href="#" className="hover:text-primary transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Social Media</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground font-light">
              © 2024 KIM DAT. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground font-light mt-2 md:mt-0">
              Forest Products Traditional Bamboo & Handicrafts
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 