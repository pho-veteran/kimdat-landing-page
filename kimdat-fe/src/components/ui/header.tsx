import { useEffect, useState } from "react";
import { Logo } from "../logo";
import { Navigation } from "../navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}