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
  
  // Subtle blood wash effects - gentle and artistic
  const warmthOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.08, 0.18, 0.25]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 0.15, 0.3, 0.4]);
  const edgeGlowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8, 1], [0, 0.1, 0.2, 0.28]);

  // Calculate container height based on content panels (3 panels = 3x viewport)
  const panelCount = 3;

  return (
    <section
      ref={containerRef}
      style={{ height: `${panelCount * 100}vh` }}
      className="bg-background relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Subtle Blood Wash Effects - Fixed to viewport */}
        <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
          {/* Gentle crimson wash overlay */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(135deg, rgba(120, 20, 30, 0.15) 0%, transparent 50%, rgba(100, 15, 25, 0.12) 100%)',
              opacity: hasReachedEnd ? 0.25 : warmthOpacity
            }}
          />
          
          {/* Soft vignette - darker edges */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(60, 10, 15, 0.4) 100%)',
              opacity: hasReachedEnd ? 0.4 : vignetteOpacity
            }}
          />

          {/* Top edge - subtle bleed */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-32"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(90, 15, 20, 0.25) 0%, transparent 100%)',
              opacity: hasReachedEnd ? 0.28 : edgeGlowOpacity
            }}
          />

          {/* Bottom edge - pooling warmth */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-40"
            style={{ 
              background: 'linear-gradient(to top, rgba(80, 12, 18, 0.3) 0%, rgba(90, 15, 22, 0.15) 50%, transparent 100%)',
              opacity: hasReachedEnd ? 0.35 : edgeGlowOpacity
            }}
          />

          {/* Left corner accent */}
          <motion.div 
            className="absolute top-0 left-0 w-1/3 h-1/3"
            style={{ 
              background: 'radial-gradient(ellipse at top left, rgba(100, 18, 25, 0.2) 0%, transparent 70%)',
              opacity: hasReachedEnd ? 0.3 : vignetteOpacity
            }}
          />

          {/* Right corner accent */}
          <motion.div 
            className="absolute bottom-0 right-0 w-2/5 h-2/5"
            style={{ 
              background: 'radial-gradient(ellipse at bottom right, rgba(95, 15, 22, 0.22) 0%, transparent 65%)',
              opacity: hasReachedEnd ? 0.32 : vignetteOpacity
            }}
          />

          {/* Center subtle glow */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              opacity: hasReachedEnd ? 0.15 : warmthOpacity
            }}
          >
            <div 
              className="w-[80%] h-[60%]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(110, 20, 28, 0.08) 0%, transparent 60%)',
                filter: 'blur(40px)'
              }}
            />
          </motion.div>
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
