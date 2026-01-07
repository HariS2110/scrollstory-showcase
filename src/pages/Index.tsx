import HeroSection from "@/components/HeroSection";
import PoemSection from "@/components/PoemSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import PosterQRSection from "@/components/PosterQRSection";
import ThankYouSection from "@/components/ThankYouSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <PoemSection />
      <HorizontalGallery />
      <PosterQRSection />
      <ThankYouSection />
    </main>
  );
};

export default Index;
