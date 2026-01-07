import { motion } from "framer-motion";
import { QrCode, Image } from "lucide-react";

const PosterQRSection = () => {
  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
        >
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-ivory border border-border rounded-xl p-8 shadow-lg w-full max-w-sm"
          >
            <div className="flex flex-col items-center justify-center h-72 md:h-96 text-charcoal">
              <Image className="w-20 h-20 mb-6 opacity-30" />
              <p className="font-serif text-3xl mb-2">Poster</p>
              <p className="text-sm text-muted-foreground">
                Coming soon
              </p>
            </div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-ivory border border-border rounded-xl p-8 shadow-lg w-full max-w-sm"
          >
            <div className="flex flex-col items-center justify-center h-72 md:h-96 text-charcoal">
              <QrCode className="w-32 h-32 mb-6 opacity-30" />
              <p className="font-serif text-3xl mb-2">Scan Me</p>
              <p className="text-sm text-muted-foreground text-center px-4">
                QR code to explore more
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PosterQRSection;
