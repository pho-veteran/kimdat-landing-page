import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      {/* Testing Section */}
      <section className="h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-secondary/10">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
          Welcome to <span className="text-primary">KimDat</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light text-center">
          Discover our exquisite collection of sustainable bamboo products and traditional handicrafts, crafted with care for nature and heritage.
        </p>
      </section>
      <section className="h-[120vh] flex items-center justify-center">
        <div className="text-3xl text-muted-foreground">Scroll up and down to see the header transition</div>
      </section>
    </div>
  );
}
