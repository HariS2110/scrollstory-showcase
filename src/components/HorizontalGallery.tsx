import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Play, QrCode } from "lucide-react";
import posterImage from "@/assets/poster.jpg";

const HorizontalGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollRange, setScrollRange] = useState(0);
  const [essayOpen, setEssayOpen] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track when scroll reaches the end - once true, stays true
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.95 && !hasReachedEnd) {
      setHasReachedEnd(true);
    }
  });

  // Calculate scroll range based on content width (zoom-resilient)
  const updateScrollRange = useCallback(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const viewportWidth = scrollRef.current.parentElement?.clientWidth || window.innerWidth;
      setScrollRange(Math.max(0, scrollWidth - viewportWidth));
    }
  }, []);

  useEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, [updateScrollRange]);

  useEffect(() => {
    document.body.style.overflow = essayOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [essayOpen]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  
  // Blood effects - progressive reveal as you scroll
  const bloodOverlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.35, 0.5]);
  const drip1Height = useTransform(scrollYProgress, [0, 0.25, 0.5], ["0%", "40%", "100%"]);
  const drip2Height = useTransform(scrollYProgress, [0.1, 0.4, 0.65], ["0%", "60%", "100%"]);
  const drip3Height = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "50%", "100%"]);
  const drip4Height = useTransform(scrollYProgress, [0.15, 0.45, 0.75], ["0%", "70%", "100%"]);
  const drip5Height = useTransform(scrollYProgress, [0.25, 0.55, 0.85], ["0%", "45%", "100%"]);
  const splatter1Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.6, 1]);
  const splatter2Opacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.5, 1]);
  const splatter3Opacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 0.7, 1]);
  const poolWidth = useTransform(scrollYProgress, [0.4, 0.7, 1], ["0%", "50%", "100%"]);

  // Calculate container height based on content panels (3 panels = 3x viewport)
  const panelCount = 3;

  return (
    <section
      ref={containerRef}
      style={{ height: `${panelCount * 100}vh` }}
      className="bg-background relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Blood Effects Layer - Fixed to viewport */}
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
          {/* Dark red overlay that intensifies */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(139, 0, 0, 0.3) 100%)',
              opacity: hasReachedEnd ? 0.5 : bloodOverlayOpacity
            }}
          />
          
          {/* Blood drips from top */}
          <motion.div 
            className="absolute top-0 left-[8%] w-3 rounded-b-full"
            style={{ 
              height: hasReachedEnd ? "100%" : drip1Height,
              background: 'linear-gradient(to bottom, #8B0000 0%, #B22222 50%, #DC143C 100%)',
              filter: 'blur(1px)',
              boxShadow: '0 0 20px rgba(139, 0, 0, 0.5)'
            }}
          />
          <motion.div 
            className="absolute top-0 left-[22%] w-5 rounded-b-full"
            style={{ 
              height: hasReachedEnd ? "100%" : drip2Height,
              background: 'linear-gradient(to bottom, #8B0000 0%, #A52A2A 60%, #CD5C5C 100%)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 15px rgba(139, 0, 0, 0.4)'
            }}
          />
          <motion.div 
            className="absolute top-0 left-[45%] w-4 rounded-b-full"
            style={{ 
              height: hasReachedEnd ? "100%" : drip3Height,
              background: 'linear-gradient(to bottom, #800000 0%, #B22222 40%, #DC143C 100%)',
              filter: 'blur(1px)',
              boxShadow: '0 0 25px rgba(128, 0, 0, 0.6)'
            }}
          />
          <motion.div 
            className="absolute top-0 left-[68%] w-6 rounded-b-full"
            style={{ 
              height: hasReachedEnd ? "100%" : drip4Height,
              background: 'linear-gradient(to bottom, #8B0000 0%, #CD5C5C 70%, #F08080 100%)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 20px rgba(139, 0, 0, 0.5)'
            }}
          />
          <motion.div 
            className="absolute top-0 left-[85%] w-4 rounded-b-full"
            style={{ 
              height: hasReachedEnd ? "100%" : drip5Height,
              background: 'linear-gradient(to bottom, #800000 0%, #B22222 50%, #DC143C 100%)',
              filter: 'blur(1px)',
              boxShadow: '0 0 18px rgba(128, 0, 0, 0.5)'
            }}
          />

          {/* Blood splatters */}
          <motion.div 
            className="absolute top-[15%] left-[12%] w-32 h-32"
            style={{ 
              opacity: hasReachedEnd ? 1 : splatter1Opacity,
              background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.8) 0%, rgba(139, 0, 0, 0.4) 40%, transparent 70%)',
              borderRadius: '60% 40% 50% 50%',
              transform: 'rotate(-15deg)',
              filter: 'blur(2px)'
            }}
          />
          <motion.div 
            className="absolute top-[55%] right-[15%] w-40 h-40"
            style={{ 
              opacity: hasReachedEnd ? 1 : splatter2Opacity,
              background: 'radial-gradient(ellipse at center, rgba(178, 34, 34, 0.7) 0%, rgba(139, 0, 0, 0.3) 50%, transparent 75%)',
              borderRadius: '45% 55% 60% 40%',
              transform: 'rotate(25deg)',
              filter: 'blur(3px)'
            }}
          />
          <motion.div 
            className="absolute bottom-[20%] left-[35%] w-48 h-36"
            style={{ 
              opacity: hasReachedEnd ? 1 : splatter3Opacity,
              background: 'radial-gradient(ellipse at center, rgba(220, 20, 60, 0.6) 0%, rgba(139, 0, 0, 0.25) 45%, transparent 70%)',
              borderRadius: '50% 50% 45% 55%',
              transform: 'rotate(-8deg)',
              filter: 'blur(2px)'
            }}
          />

          {/* Blood pool at bottom */}
          <motion.div 
            className="absolute bottom-0 left-0 h-24"
            style={{ 
              width: hasReachedEnd ? "100%" : poolWidth,
              background: 'linear-gradient(to top, rgba(139, 0, 0, 0.9) 0%, rgba(139, 0, 0, 0.5) 40%, transparent 100%)',
              filter: 'blur(3px)'
            }}
          />
          
          {/* Corner vignettes */}
          <motion.div 
            className="absolute top-0 left-0 w-1/3 h-1/3"
            style={{ 
              opacity: hasReachedEnd ? 0.6 : bloodOverlayOpacity,
              background: 'radial-gradient(ellipse at top left, rgba(128, 0, 0, 0.6) 0%, transparent 70%)'
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-1/2 h-1/2"
            style={{ 
              opacity: hasReachedEnd ? 0.5 : bloodOverlayOpacity,
              background: 'radial-gradient(ellipse at bottom right, rgba(139, 0, 0, 0.5) 0%, transparent 65%)'
            }}
          />
        </div>

        <motion.div ref={scrollRef} style={{ x }} className="flex gap-0 relative">
          {/* Video Panel */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 relative z-10">
            <div className="w-full max-w-4xl aspect-video bg-ivory rounded-lg overflow-hidden relative group cursor-pointer shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-charcoal/10 flex items-center justify-center group-hover:bg-charcoal/20 transition-colors"
                >
                  <Play className="w-8 h-8 text-charcoal ml-1" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Essay Panel */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16 relative z-10">
            <div className="max-w-3xl w-full bg-ivory/95 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg">
              <h3
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                className="font-serif text-charcoal mb-6"
              >
                About This Project
              </h3>

              <div
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
                className="text-muted-foreground leading-relaxed space-y-4"
              >
                <p>
                  This film examines the patriarchal gaze as more than something men impose.
                  It is also something women can internalise and turn upon themselves.
                  Looking becomes a discipline: a way of measuring, correcting, and containing
                  the feminine body.
                </p>

                <p>
                  The film insists that a 'female gaze' is not inherently liberatory.
                  When femininity is shaped to be seen, approved, and controlled,
                  the same hierarchies quietly reassert themselves.
                </p>
              </div>

              <div className="mt-10 mb-8">
                <p
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                  className="font-serif text-charcoal leading-snug"
                >
                  "They called me the Lakshmi of this house…
                  <br />
                  and then they took my wings."
                </p>
              </div>

              <button
                onClick={() => setEssayOpen(true)}
                className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
              >
                Read more about the film's themes →
              </button>
            </div>
          </div>

          {/* Poster + QR Panel */}
          <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-5xl w-full">

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-ivory border border-border rounded-xl shadow-lg w-full max-w-sm overflow-hidden"
              >
                <img
                  src={posterImage}
                  alt="Film poster"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-ivory border border-border rounded-xl p-8 shadow-lg w-full max-w-sm"
              >
                <div className="flex flex-col items-center justify-center h-72 md:h-96 text-charcoal">
                  <QrCode className="w-32 h-32 mb-6 opacity-30" />
                  <p className="font-serif mb-2 text-2xl">Scan Me</p>
                  <p className="text-muted-foreground text-sm text-center px-4">
                    QR code to explore more
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          <div className="w-16 flex-shrink-0" />
        </motion.div>
      </div>

      {/* MODAL */}
      {essayOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ivory max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 rounded-lg shadow-2xl"
          >
            <button
              onClick={() => setEssayOpen(false)}
              className="mb-8 text-sm text-charcoal/60 hover:text-charcoal"
            >
              Close
            </button>

            <div
              style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
              className="text-muted-foreground leading-relaxed space-y-4"
            >
              <p>
                The opening image is a goddess statue, still, sacred, idolised.
                Divinity slips into flesh as she becomes human.
              </p>

              <p>
                A society that prays to the Goddess can still restrict living women.
                Cultural symbols become double-edged.
              </p>

              <p>
                Braiding the hair becomes a quiet act of restraint —
                beauty reshaped into compliance.
              </p>

              <p>
                Kali is not fear. She is courage —
                the goddess within every woman.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HorizontalGallery;
