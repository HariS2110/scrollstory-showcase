import HeroSection from "@/components/HeroSection";
import PoemSection from "@/components/PoemSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import ThankYouSection from "@/components/ThankYouSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <PoemSection />
      <HorizontalGallery />
      <ThankYouSection />
    </main>
  );
};

export default Index;
