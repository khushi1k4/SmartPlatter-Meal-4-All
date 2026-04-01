import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const name = "SmartPlatter: Meal-4-All";

function Loader({ onFinish = () => {} }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
              onFinish();
            }, 600);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/meal-4-all.webp')" }}
          />

          {/* Green Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-black/80 backdrop-blur-md" />

          {/* Floating Particles (Amber Glow) */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(35)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-800 blur-[2px]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: "0 0 18px rgba(146, 64, 14, 0.9)",
                }}
                animate={{
                  y: ["0%", "-120%"],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.4, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glowing Title */}
          <motion.h1
            className="relative z-20 text-3xl md:text-6xl font-extrabold text-white tracking-widest text-center px-4"
            style={{
              textShadow:
                "0 0 15px rgba(34,197,94,0.8), 0 0 35px rgba(146,64,14,0.7)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            {name}
          </motion.h1>

          {/* Loading Bar */}
          <div className="relative z-20 mt-14 w-72 h-5 bg-white/20 rounded-full overflow-hidden backdrop-blur-lg border border-amber-800 shadow-xl">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-amber-800 shadow-[0_0_25px_rgba(34,197,94,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="relative z-20 mt-5 text-sm text-white tracking-wider"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Loading {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;