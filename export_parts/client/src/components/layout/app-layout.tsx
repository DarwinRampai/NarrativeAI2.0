import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useTheme } from "@/hooks/use-theme";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic parallax effect based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Track mouse movement for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    // Track scroll direction for adaptive UI
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden perspective-1000">
      {/* Dynamic background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent pointer-events-none"
        style={{ y: backgroundY }}
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(109,40,217,0.08) 0%, rgba(109,40,217,0.03) 50%, transparent 100%)",
            "radial-gradient(circle at 100% 100%, rgba(109,40,217,0.08) 0%, rgba(109,40,217,0.03) 50%, transparent 100%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Reactive light particles */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(109,40,217,0.1) 0%, transparent 50%)`
        }}
        transition={{ type: "spring", damping: 10 }}
      />

      <div className="relative z-10">
        <Navbar scrollDirection={scrollDirection} />
        <Sidebar />

        {/* Spatial content area with 3D-like depth */}
        <motion.main
          initial={{ opacity: 0, y: 20, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="ml-[280px] pt-16 transform-gpu"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              className="p-6"
              initial={{ opacity: 0, scale: 0.95, z: -100 }}
              animate={{ opacity: 1, scale: 1, z: 0 }}
              exit={{ opacity: 0, scale: 0.95, z: -100 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </div>

      {/* Dynamic holographic grid effect */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(to_right,_rgba(109,40,217,0.05)_1px,_transparent_1px)]"
        style={{ 
          backgroundSize: '64px 64px',
          scale: gridScale,
          opacity: 0.3,
          pointerEvents: 'none',
          transform: `rotate3d(${mousePosition.y * 0.5}, ${mousePosition.x * 0.5}, 0, ${Math.sqrt(Math.pow(mousePosition.x, 2) + Math.pow(mousePosition.y, 2)) * 2}deg)`
        }}
      />

      {/* Ambient glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
    </div>
  );
}