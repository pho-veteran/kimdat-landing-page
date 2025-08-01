import { Link } from "react-router";
import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Home, 
  Package, 
  Newspaper, 
  Phone, 
  ChevronRight, 
  ChevronDown,
  Circle
} from "lucide-react";
import type { Category } from "@/types/api";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

interface NavigationProps {
  scrolled?: boolean;
  categories?: Category[];
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: Category[];
}

export function MobileNavigation({ isOpen, onClose, categories = [] }: MobileNavigationProps) {
  const [showProducts, setShowProducts] = useState(true);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-md shadow-2xl z-50 transform transition-all duration-300 ease-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="relative p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Menu size={16} className="text-primary" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">Menu</span>
                  <p className="text-xs text-gray-500 font-medium">Điều hướng</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 hover:bg-white/70 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 group"
                aria-label="Close menu"
              >
                <X size={20} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1 px-4">
              {/* Home Link */}
              <Link
                to={NAV_LINKS[0].href}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:text-primary font-medium rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Home size={18} className="transition-colors" />
                </div>
                <span>{NAV_LINKS[0].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} />
                </div>
              </Link>

              {/* Products with submenu */}
              <div className="space-y-1">
                <button
                  onClick={() => setShowProducts(!showProducts)}
                  className="group w-full flex items-center gap-4 px-4 py-3.5 font-medium rounded-xl transition-all duration-200 hover:translate-x-1 text-gray-700 hover:text-primary hover:bg-primary/5"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Package size={18} className="transition-colors" />
                  </div>
                  <span className="flex-1 text-left">Sản phẩm</span>
                  <ChevronDown 
                    size={16}
                    className={`transform transition-all duration-300 text-gray-400 ${showProducts ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Submenu with animation */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showProducts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="ml-6 pl-4 border-l-2 border-gray-200/50 space-y-1">
                    <Link
                      to="/san-pham"
                      onClick={onClose}
                      className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary font-medium rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                    >
                      <Circle size={6} className="text-gray-400 group-hover:text-primary transition-colors fill-current" />
                      <span>Tất cả sản phẩm</span>
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/san-pham/${category.id}`}
                        onClick={onClose}
                        className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:text-primary font-medium rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                      >
                        <Circle size={4} className="text-gray-300 group-hover:text-primary transition-colors fill-current" />
                        <span>{category.name}</span>
                        <span className="ml-auto text-xs text-gray-400">({category._count.products})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* News Link */}
              <Link
                to={NAV_LINKS[1].href}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:text-primary font-medium rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Newspaper size={18} className="transition-colors" />
                </div>
                <span>{NAV_LINKS[1].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} />
                </div>
              </Link>

              {/* Contact Link */}
              <Link
                to={NAV_LINKS[2].href}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:text-primary font-medium rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Phone size={18} className="transition-colors" />
                </div>
                <span>{NAV_LINKS[2].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Navigation({ scrolled = false, categories = [] }: NavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-2 md:gap-6">
      <Link
        to={NAV_LINKS[0].href}
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${scrolled
            ? "text-foreground hover:text-primary"
            : "text-white hover:text-accent"
          }`}
      >
        {NAV_LINKS[0].label}
      </Link>

      <div className="relative group">
        <Link
          to="/san-pham"
          className={`text-base font-medium transition-colors duration-500 px-3 py-2 flex items-center gap-1 cursor-pointer select-none outline-none focus:outline-none ${scrolled
              ? "text-foreground hover:text-primary"
              : "text-white hover:text-accent"
            }`}
        >
          Sản phẩm
          <ChevronDown size={16} />
        </Link>

        {/* Hover dropdown menu */}
        <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            <Link
              to="/san-pham"
              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
            >
              Tất cả sản phẩm
            </Link>
            <div className="border-t border-gray-100 my-1"></div>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/san-pham/${category.id}`}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-400">({category._count.products})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link
        to={NAV_LINKS[1].href}
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${scrolled
            ? "text-foreground hover:text-primary"
            : "text-white hover:text-accent"
          }`}
      >
        {NAV_LINKS[1].label}
      </Link>
      <Link
        to={NAV_LINKS[2].href}
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${scrolled
            ? "text-foreground hover:text-primary"
            : "text-white hover:text-accent"
          }`}
      >
        {NAV_LINKS[2].label}
      </Link>
    </nav>
  );
} 