import { Link } from "react-router";

const NAV_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

interface NavigationProps {
  scrolled?: boolean;
}

export function Navigation({ scrolled = false }: NavigationProps) {
  return (
    <nav className="flex items-center gap-2 md:gap-6">
      <Link
        to={NAV_LINKS[0].href}
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${
          scrolled 
            ? "text-foreground hover:text-primary" 
            : "text-white hover:text-accent"
        }`}
      >
        {NAV_LINKS[0].label}
      </Link>
      
      <div className="relative group">
        <Link 
          to="/san-pham" 
          className={`text-base font-medium transition-colors duration-500 px-3 py-2 flex items-center gap-1 cursor-pointer select-none outline-none focus:outline-none ${
            scrolled 
              ? "text-foreground hover:text-primary" 
              : "text-white hover:text-accent"
          }`}
        >
          Sản phẩm
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${
          scrolled 
            ? "text-foreground hover:text-primary" 
            : "text-white hover:text-accent"
        }`}
      >
        {NAV_LINKS[1].label}
      </Link>
      <Link
        to={NAV_LINKS[2].href}
        className={`text-base font-medium transition-colors duration-500 px-3 py-2 ${
          scrolled 
            ? "text-foreground hover:text-primary" 
            : "text-white hover:text-accent"
        }`}
      >
        {NAV_LINKS[2].label}
      </Link>
    </nav>
  );
} 