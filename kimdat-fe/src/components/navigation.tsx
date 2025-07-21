import { Link } from "react-router";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

interface NavigationProps {
  scrolled?: boolean;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const [showProducts, setShowProducts] = useState(false);

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
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-primary">
                    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-gray-800 transition-colors">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="transition-colors">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{NAV_LINKS[0].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>

              {/* Products with submenu */}
              <div className="space-y-1">
                <button
                  onClick={() => setShowProducts(!showProducts)}
                  className={`group w-full flex items-center gap-4 px-4 py-3.5 font-medium rounded-xl transition-all duration-200 hover:translate-x-1 ${showProducts
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                    }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="transition-colors">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="flex-1 text-left">Sản phẩm</span>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`transform transition-all duration-300 ${showProducts ? 'rotate-180 text-primary' : 'text-gray-400'}`}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Submenu with animation */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showProducts ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="ml-6 pl-4 border-l-2 border-gray-200/50 space-y-1">
                    <Link
                      to="/san-pham"
                      onClick={onClose}
                      className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary font-medium rounded-lg hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-primary transition-colors"></div>
                      <span>Tất cả sản phẩm</span>
                    </Link>
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
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="transition-colors">
                    <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2 2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span>{NAV_LINKS[1].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>

              {/* Contact Link */}
              <Link
                to={NAV_LINKS[2].href}
                onClick={onClose}
                className="group flex items-center gap-4 px-4 py-3.5 text-gray-700 hover:text-primary font-medium rounded-xl hover:bg-primary/5 transition-all duration-200 hover:translate-x-1"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="transition-colors">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{NAV_LINKS[2].label}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Navigation({ scrolled = false }: NavigationProps) {
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
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Hover dropdown menu */}
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-1">
            <Link
              to="/san-pham"
              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Tất cả sản phẩm
            </Link>
            {/* Add more menu items here */}
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