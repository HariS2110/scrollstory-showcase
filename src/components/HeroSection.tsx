import { motion } from "framer-motion";
import introVideo from "@/assets/intro.mov";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background px-6 relative">
      <div className="flex flex-col items-center">
        {/* Intro video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <video
            src={introVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-64 md:w-80 lg:w-96"
          />
        </motion.div>

        {/* Name text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif text-3xl md:text-4xl text-foreground tracking-wide italic"
        >
          Smrithi Barla
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-3 text-sm font-sans tracking-[0.3em] uppercase text-muted-foreground"
        >
          Made in Hyderabad
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-12 flex flex-col items-center text-muted-foreground"
      >
        <span className="text-sm font-sans tracking-widest uppercase mb-3">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-foreground/40"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
