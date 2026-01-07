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
      className="h-[200vh] bg-ivory relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={scrollRef}
          style={{ x }}
          className="flex gap-0 pl-0"
        >
          {/* Text + Poster Card (Side by Side) */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl w-full">
              {/* Text/Writeup Side */}
              <div className="flex-1 max-w-xl">
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-charcoal mb-6">
                  About This Project
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">
                  This piece explores the weight of expectations placed upon women, 
                  the quiet violence of being worshipped while being diminished, 
                  and the reclamation of divine feminine power.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Through the lens of Hindu mythology, it speaks to the universal 
                  experience of women who are praised for their sacrifice while being 
                  denied their agency.
                </p>
              </div>
              
              {/* Poster Side */}
              <div className="flex-1 max-w-md">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: -2 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background border border-border rounded-lg p-8 shadow-xl transform rotate-3"
                >
                  <div className="flex flex-col items-center justify-center h-64 md:h-80 text-charcoal">
                    <Image className="w-16 h-16 mb-4 opacity-40" />
                    <p className="font-serif text-2xl mb-2">Poster</p>
                    <p className="text-sm text-muted-foreground">
                      Coming soon
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Spacer for scroll end */}
          <div className="w-32 flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
