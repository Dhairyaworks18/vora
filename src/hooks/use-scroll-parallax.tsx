import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: [string, string];
  inputRange?: number[];
  outputRange?: number[];
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { offset = ["start end", "end start"], inputRange = [0, 1], outputRange = [100, -100] } = options;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, inputRange, outputRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return { ref, y, opacity, scale, scrollYProgress };
};

export const useParallaxY = (distance: number = 50) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return { ref, y, scrollYProgress };
};

export const useParallaxScale = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return { ref, scale, opacity, scrollYProgress };
};
