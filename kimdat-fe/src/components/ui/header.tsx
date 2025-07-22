import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { Navigation, MobileNavigation } from "../navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
            <Navigation scrolled={scrolled} />
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
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}