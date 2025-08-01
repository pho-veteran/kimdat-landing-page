import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { Navigation, MobileNavigation } from "../navigation";
import { cn } from "@/lib/utils";
import { apiService } from "@/services/api";
import type { Category } from "@/types/api";
import { Menu } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 shadow-md backdrop-blur-md h-16 opacity-95"
            : "bg-transparent h-24 opacity-100"
        )}
        style={{
          borderBottom: scrolled ? "1px solid #eee" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center h-full px-6 justify-between">
          <div className="relative z-10">
            <Logo scrolled={scrolled} />
          </div>

          {/* Desktop Navigation */}
          <div className="relative z-20">
            <Navigation scrolled={scrolled} categories={categories} />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled
                ? "text-foreground hover:bg-accent"
                : "text-white hover:bg-white/10"
              }`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
      />
    </>
  );
}