import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import kaliImage from "@/assets/kali.jpg";
import bloodSpillImage from "@/assets/blood-spill.jpg";

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

  // Background images fade in as user scrolls deeper into poem
  const kaliOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.35, 0.5]);
  const bloodOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 0.2, 0.4, 0.55]);

  return (
    <section
      ref={containerRef}
      className="min-h-[150vh] bg-ivory py-32 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Blood stain background layer - contained within section */}
      <motion.div
        style={{ opacity: bloodOpacity }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <img
          src={bloodSpillImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: 'multiply' }}
        />
      </motion.div>

      {/* Kali image background layer - contained within section */}
      <motion.div
        style={{ opacity: kaliOpacity }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
      >
        <img
          src={kaliImage}
          alt=""
          className="max-w-[80%] max-h-[80%] object-contain"
          style={{ mixBlendMode: 'multiply' }}
        />
      </motion.div>

      <div className="max-w-2xl mx-auto sticky top-24 relative z-10">
        <div>
          {poemLines.map((line, index) => {
            const start = index / poemLines.length;
            const end = (index + 1.5) / poemLines.length;
            
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
