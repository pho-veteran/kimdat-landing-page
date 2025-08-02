import { HeroSection, IntroSection, FeaturesSection, ProductsPreviewSection } from '../components/home'

export default function Home() {
  const scrollToIntro = () => {
    document.getElementById('intro-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      <HeroSection onScrollToIntro={scrollToIntro} />
      <IntroSection />
      <FeaturesSection />
      <ProductsPreviewSection />
    </div>
  )
}
