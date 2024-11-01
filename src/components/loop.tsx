import { AnimatePresence, MotionConfig } from "framer-motion";
import { motion } from "framer-motion";
import { useMedia } from "react-use";

export default function Loop() {
  const isLarge = useMedia("(min-width: 400px)");

  return (
    <div className="bg-white/10 p-5 rounded-md mt-8 relative text-white/40 font-semibold ">
      <AnimatePresence>
        <MotionConfig>
          <motion.div
        
            variants={{
              begin: isLarge ? { x: 0 } : { y: 0 },
              end: isLarge? {x:40} :{ y: 40},
            }}
            initial="begin"
            animate="end"
            exit="end"
            transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
            }}
          >
            Multiple live cursors
          </motion.div>
        </MotionConfig>
      </AnimatePresence>
    </div>
  );
}
