import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-background flex items-center justify-center px-6 py-24"
    >
      <motion.div
        style={{ opacity, scale }}
        className="w-full max-w-4xl aspect-video bg-ivory rounded-lg overflow-hidden relative group cursor-pointer shadow-lg"
      >
        {/* Video placeholder - replace src with actual video */}
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal/5">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-charcoal/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-charcoal/20 transition-colors"
            >
              <Play className="w-8 h-8 text-charcoal ml-1" />
            </motion.div>
            <p className="text-muted-foreground font-sans text-sm tracking-wide">
              Video coming soon
            </p>
          </div>
        </div>

        {/* When you have the video, replace the div above with:
        <video
          className="w-full h-full object-cover"
          controls
          poster="/path-to-poster.jpg"
        >
          <source src="/path-to-video.mp4" type="video/mp4" />
        </video>
        */}
      </motion.div>
    </section>
  );
};

export default VideoSection;
