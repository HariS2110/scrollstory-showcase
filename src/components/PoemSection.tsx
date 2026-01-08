import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Red spill/blood effect styles
const spillStyles = {
  background: `
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(139, 0, 0, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse 60% 80% at 80% 60%, rgba(120, 0, 0, 0.35) 0%, transparent 45%),
    radial-gradient(ellipse 100% 60% at 50% 80%, rgba(100, 0, 0, 0.3) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 30% 70%, rgba(80, 0, 0, 0.25) 0%, transparent 40%)
  `,
};

const poemLines = [
  "Mother, they called me the Lakshmi of this house,",
  "placed devotion on my head like a command.",
  "",
  "They bowed to me, and then they took my wings.",
  "",
  "They named the cage culture, my silence virtue.",
  "They watched me grow smaller, breath by breath,",
  "and called it respect.",
  "",
  "When I did not vanish, Mother,",
  "they whispered your other name, Mahakali,",
  "as if my voice were a warning,",
  "as if staying alive were a crime.",
  "",
  "They fear women who endure.",
  "",
  "But you, Mother, you were never meant to be gentle.",
  "You were Mahishasura Mardini,",
  "the end of what believed it could own you.",
  "",
  "I do not come to you for destruction.",
  "I come for breath. For space.",
  "For a life that lets me remain.",
  "",
  "I am your child, Mother.",
  "Not their sacrifice.",
];

const PoemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Animate the spill effect based on scroll
  const spillOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.8, 1, 0.6]);
  const spillScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);

  return (
    <section
      ref={containerRef}
      className="min-h-[200vh] bg-ivory py-32 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Red spill/blood effect layer */}
      <motion.div
        style={{
          opacity: spillOpacity,
          scale: spillScale,
          ...spillStyles,
        }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Kali shadow silhouettes */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 0.15, 0.25, 0.1]) }}
        className="fixed inset-0 pointer-events-none z-0"
      >
        {/* Left shadow figure */}
        <div
          className="absolute left-0 top-1/4 w-1/3 h-2/3"
          style={{
            background: `
              radial-gradient(ellipse 100% 150% at 0% 50%, rgba(0, 0, 0, 0.4) 0%, transparent 60%)
            `,
            filter: 'blur(20px)',
          }}
        />
        {/* Right shadow figure */}
        <div
          className="absolute right-0 top-1/3 w-1/3 h-2/3"
          style={{
            background: `
              radial-gradient(ellipse 100% 150% at 100% 50%, rgba(0, 0, 0, 0.35) 0%, transparent 55%)
            `,
            filter: 'blur(25px)',
          }}
        />
        {/* Central ethereal presence */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-full"
          style={{
            background: `
              radial-gradient(ellipse 80% 100% at 50% 30%, rgba(60, 0, 0, 0.2) 0%, transparent 50%)
            `,
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      <div className="max-w-2xl mx-auto sticky top-24 relative z-10">
        <div>
          {poemLines.map((line, index) => {
            const start = index / (poemLines.length + 2);
            const end = (index + 1) / (poemLines.length + 2);
            
            return (
              <PoemLine
                key={index}
                line={line}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface PoemLineProps {
  line: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}

const PoemLine = ({ line, scrollYProgress, start, end }: PoemLineProps) => {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  if (line === "") {
    return <div className="h-8" />;
  }

  return (
    <motion.p
      style={{ opacity, y, fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)' }}
      className="font-serif text-charcoal leading-relaxed italic"
    >
      {line}
    </motion.p>
  );
};

export default PoemSection;
