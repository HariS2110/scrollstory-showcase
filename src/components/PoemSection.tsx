import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Placeholder poem - your friend can replace this
const poemLines = [
  "In the quiet hum of Hyderabad streets,",
  "where the old mingles with the new,",
  "stories weave through chai-stained mornings",
  "and sunsets painted in monsoon hue.",
  "",
  "We carry pieces of the places we love,",
  "stitched into the fabric of who we are—",
  "a language of belonging",
  "written beneath each passing star.",
  "",
  "This is a letter to the city,",
  "to the hands that shaped these dreams,",
  "to every road that led me here,",
  "and every thread that holds the seams.",
];

const PoemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="min-h-[200vh] bg-ivory py-32 px-6 md:px-12"
    >
      <div className="max-w-2xl mx-auto sticky top-1/4">
        <div className="space-y-4">
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
      style={{ opacity, y }}
      className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed italic"
    >
      {line}
    </motion.p>
  );
};

export default PoemSection;
