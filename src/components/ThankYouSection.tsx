import { motion } from "framer-motion";

const ThankYouSection = () => {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(0.625rem, 1vw, 0.875rem)' }}
          className="font-sans tracking-[0.3em] uppercase text-muted-foreground mb-8"
        >
          With gratitude
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          className="font-serif text-charcoal mb-8 italic"
        >
          Thank You
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="w-24 h-px bg-gold-muted mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
          className="font-sans text-muted-foreground leading-relaxed"
        >
          For taking this journey with me.
          <br />
          <span className="text-charcoal font-medium mt-4 block">
            — Smrithi Barla
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(0.5rem, 0.8vw, 0.75rem)' }}
          className="font-sans tracking-widest uppercase text-muted-foreground/60 mt-16"
        >
          Made in Hyderabad
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ThankYouSection;
