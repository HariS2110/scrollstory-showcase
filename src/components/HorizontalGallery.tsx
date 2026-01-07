import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode, Image } from "lucide-react";

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      setScrollRange(scrollWidth - viewportWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={containerRef}
      className="h-[300vh] bg-ivory relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-8 pl-8 md:pl-16"
        >
          {/* Video Card */}
          <GalleryCard className="bg-charcoal">
            <div className="flex flex-col items-center justify-center h-full text-cream">
              <div className="w-16 h-16 rounded-full border-2 border-cream/30 flex items-center justify-center mb-4">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <p className="font-sans text-sm tracking-wide opacity-70">
                The Film
              </p>
            </div>
          </GalleryCard>

          {/* Poster Card */}
          <GalleryCard className="bg-background border border-border">
            <div className="flex flex-col items-center justify-center h-full text-charcoal">
              <Image className="w-12 h-12 mb-4 opacity-40" />
              <p className="font-serif text-2xl mb-2">Poster</p>
              <p className="font-sans text-sm text-muted-foreground">
                Coming soon
              </p>
            </div>
          </GalleryCard>

          {/* QR Code Card */}
          <GalleryCard className="bg-background border border-border">
            <div className="flex flex-col items-center justify-center h-full text-charcoal">
              <QrCode className="w-24 h-24 mb-4 opacity-30" />
              <p className="font-serif text-2xl mb-2">Scan Me</p>
              <p className="font-sans text-sm text-muted-foreground text-center px-8">
                QR code to explore more
              </p>
            </div>
          </GalleryCard>

          {/* Spacer for scroll end */}
          <div className="w-16 md:w-32 flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

interface GalleryCardProps {
  children: React.ReactNode;
  className?: string;
}

const GalleryCard = ({ children, className = "" }: GalleryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`w-[80vw] md:w-[60vw] lg:w-[50vw] h-[70vh] rounded-2xl flex-shrink-0 overflow-hidden shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Play = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default HorizontalGallery;
