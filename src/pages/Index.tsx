import HeroSection from "@/components/HeroSection";
import PoemSection from "@/components/PoemSection";
import VideoSection from "@/components/VideoSection";
import HorizontalGallery from "@/components/HorizontalGallery";
import PosterQRSection from "@/components/PosterQRSection";
import ThankYouSection from "@/components/ThankYouSection";

const Index = () => {
  return (
    <main className="bg-background">
      <HeroSection />
      <PoemSection />
      <VideoSection />
      <HorizontalGallery />
      <PosterQRSection />
      <ThankYouSection />
    </main>
  );
};

export default Index;
