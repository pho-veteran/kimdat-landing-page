import { Link } from "react-router";

export function Logo() {
  return (
    <Link 
      to="/" 
      className="group flex items-center gap-3 select-none transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-md p-1 -m-1"
      aria-label="KimDat - Go to homepage"
    >
      {/* Logo Image */}
      <img 
        src="/logo.png" 
        alt="KimDat Logo" 
        className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-200" 
      />
      
      {/* Brand Text */}
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold font-mono tracking-widest text-primary leading-none group-hover:text-primary/90 transition-colors duration-200">
          KIMDAT
        </span>
        <span className="text-[0.6rem] text-muted-foreground font-medium tracking-wider uppercase opacity-70 group-hover:opacity-90 transition-opacity duration-200 ml-2">
          Forest Products
        </span>
      </div>
    </Link>
  );
} 