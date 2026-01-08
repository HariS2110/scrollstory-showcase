import { motion } from "framer-motion";
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
  // Count non-empty lines for progress calculation
  const totalLines = poemLines.filter((l) => l !== "").length;
  let visibleCount = 0;

  return (
    <section className="bg-ivory py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Blood stains - fades in with intersection */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <img
          src={bloodSpillImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "multiply", objectPosition: "center top" }}
        />
      </motion.div>

      {/* Kali image - fades in later */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center"
      >
        <img
          src={kaliImage}
          alt=""
          className="max-w-[80%] max-h-[70%] object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </motion.div>

      {/* Poem content */}
      <div className="max-w-2xl mx-auto relative z-10">
        {poemLines.map((line, index) => {
          if (line === "") {
            return <div key={index} className="h-6 md:h-8" />;
          }

          visibleCount++;
          const delay = visibleCount * 0.08;

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.8 }}
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)" }}
              className="font-serif text-charcoal leading-relaxed italic mb-1"
            >
              {line}
            </motion.p>
          );
        })}
      </div>
    </section>
  );
};

export default PoemSection;
