"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Candy {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "donut" | "cupcake" | "macaron" | "candy" | "chocolate" | "cake" | "lollipop";
  rotation: number;
  opacity: number;
  depth: number; // For parallax effect (0 = slow, 1 = fast)
}

const candyTypes: Candy["type"][] = ["donut", "cupcake", "macaron", "candy", "chocolate", "cake", "lollipop"];

function CandySVG({ type, size, colorScheme = "gold" }: { type: Candy["type"]; size: number; colorScheme?: "gold" | "pastel" }) {
  const fill = colorScheme === "gold" ? "#c9a961" : "#e8b4c8";
  const stroke = colorScheme === "gold" ? "#a88b3d" : "#d4a0b5";
  const pink = "#e8b4c8";
  const cream = "#f7f3ec";
  const brown = "#5c3d2e";

  const baseProps = {
    width: size,
    height: size,
    viewBox: "0 0 60 60",
    fill: "none" as const,
  };

  switch (type) {
    case "donut":
      return (
        <svg {...baseProps}>
          <circle cx="30" cy="30" r="22" fill={cream} stroke={stroke} strokeWidth="2"/>
          <circle cx="30" cy="30" r="8" fill="#f7f3ec" stroke={stroke} strokeWidth="2"/>
          <circle cx="22" cy="22" r="2" fill="#e8b4c8"/>
          <circle cx="38" cy="20" r="2" fill="#a8d8ea"/>
          <circle cx="42" cy="30" r="2" fill="#e8b4c8"/>
          <circle cx="36" cy="40" r="2" fill="#98d8aa"/>
          <circle cx="24" cy="40" r="2" fill="#ffd93d"/>
          <circle cx="18" cy="32" r="2" fill="#a8d8ea"/>
        </svg>
      );
    case "cupcake":
      return (
        <svg {...baseProps}>
          <path d="M15 55 L20 35 L40 35 L45 55 Z" fill={brown} stroke={stroke} strokeWidth="1.5"/>
          <line x1="22" y1="35" x2="22" y2="55" stroke="#4a2c1a" strokeWidth="0.5" opacity="0.5"/>
          <line x1="30" y1="35" x2="30" y2="55" stroke="#4a2c1a" strokeWidth="0.5" opacity="0.5"/>
          <line x1="38" y1="35" x2="38" y2="55" stroke="#4a2c1a" strokeWidth="0.5" opacity="0.5"/>
          <ellipse cx="30" cy="28" rx="18" ry="12" fill={pink} stroke={stroke} strokeWidth="1.5"/>
          <circle cx="30" cy="15" r="4" fill="#c9a961" stroke={stroke} strokeWidth="1"/>
        </svg>
      );
    case "macaron":
      return (
        <svg {...baseProps}>
          <ellipse cx="30" cy="38" rx="20" ry="10" fill={pink} stroke={stroke} strokeWidth="2"/>
          <rect x="10" y="28" width="40" height="10" fill={cream}/>
          <ellipse cx="30" cy="28" rx="20" ry="10" fill={pink} stroke={stroke} strokeWidth="2"/>
          <ellipse cx="30" cy="23" rx="16" ry="4" fill="#f5d5e0" opacity="0.6"/>
        </svg>
      );
    case "candy":
      return (
        <svg {...baseProps}>
          <circle cx="30" cy="30" r="15" fill={pink} stroke={stroke} strokeWidth="2"/>
          <path d="M15 30 Q5 25 3 30 Q5 35 15 30" fill={pink} stroke={stroke} strokeWidth="1.5"/>
          <path d="M45 30 Q55 25 57 30 Q55 35 45 30" fill={pink} stroke={stroke} strokeWidth="1.5"/>
          <path d="M22 25 Q30 20 38 25" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M22 35 Q30 40 38 35" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "chocolate":
      return (
        <svg {...baseProps}>
          <rect x="12" y="18" width="36" height="24" rx="3" fill={brown} stroke={stroke} strokeWidth="2"/>
          <line x1="24" y1="18" x2="24" y2="42" stroke="#4a2c1a" strokeWidth="1"/>
          <line x1="36" y1="18" x2="36" y2="42" stroke="#4a2c1a" strokeWidth="1"/>
          <line x1="12" y1="30" x2="48" y2="30" stroke="#4a2c1a" strokeWidth="1"/>
          <rect x="14" y="20" width="8" height="8" rx="1" fill="#7a5240" opacity="0.5"/>
        </svg>
      );
    case "cake":
      return (
        <svg {...baseProps}>
          <rect x="10" y="32" width="40" height="20" rx="2" fill={cream} stroke={stroke} strokeWidth="2"/>
          <rect x="10" y="32" width="40" height="6" fill={pink} stroke={stroke} strokeWidth="1"/>
          <rect x="10" y="42" width="40" height="10" fill={cream} stroke={stroke} strokeWidth="1"/>
          <line x1="20" y1="32" x2="20" y2="52" stroke="#d4a5b5" strokeWidth="1"/>
          <line x1="30" y1="32" x2="30" y2="52" stroke="#d4a5b5" strokeWidth="1"/>
          <line x1="40" y1="32" x2="40" y2="52" stroke="#d4a5b5" strokeWidth="1"/>
          <rect x="26" y="22" width="8" height="12" fill={brown}/>
          <ellipse cx="30" cy="20" rx="4" ry="6" fill="#ff9f43"/>
          <ellipse cx="30" cy="16" rx="2" ry="4" fill="#ff6b35"/>
        </svg>
      );
    case "lollipop":
      return (
        <svg {...baseProps}>
          <rect x="28" y="40" width="4" height="18" rx="2" fill={cream} stroke={stroke} strokeWidth="1"/>
          <circle cx="30" cy="24" r="18" fill={pink} stroke={stroke} strokeWidth="2"/>
          <path d="M30 6 A18 18 0 0 1 48 24" stroke={stroke} strokeWidth="3" fill="none"/>
          <path d="M30 6 A18 18 0 0 0 12 24" stroke="#a8d8ea" strokeWidth="3" fill="none"/>
          <path d="M30 42 A18 18 0 0 0 48 24" stroke={stroke} strokeWidth="3" fill="none"/>
          <circle cx="30" cy="24" r="5" fill={cream}/>
        </svg>
      );
    default:
      return null;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const candyVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
    rotate: 0,
  },
  visible: (custom: Candy) => ({
    opacity: custom.opacity,
    scale: 1,
    rotate: custom.rotation,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

// Individual candy wrapper with parallax
function FloatingCandy({ candy }: { candy: Candy }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -candy.depth * 80]);
  
  const floatingAnimation = {
    y: [0, -30 - candy.depth * 20, 0],
    x: [0, 15 * (candy.id % 2 === 0 ? 1 : -1), 0, 10 * (candy.id % 2 === 0 ? -1 : 1), 0],
    rotate: [candy.rotation, candy.rotation + 10, candy.rotation - 5, candy.rotation + 15, candy.rotation],
    scale: [1, 1.05, 0.95, 1.02, 1],
    transition: {
      duration: candy.duration,
      delay: candy.delay,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  };

  return (
    <motion.div
      custom={candy}
      variants={candyVariants}
      style={{
        position: "absolute",
        left: `${candy.x}%`,
        top: `${candy.y}%`,
        width: candy.size,
        height: candy.size,
        y,
        filter: "drop-shadow(0 4px 12px rgba(168, 139, 61, 0.15))",
      }}
      animate={floatingAnimation}
    >
      <CandySVG 
        type={candy.type} 
        size={candy.size}
        colorScheme={candy.id % 3 === 0 ? "pastel" : "gold"}
      />
    </motion.div>
  );
}

export default function FloatingCandies() {
  const [candies, setCandies] = useState<Candy[]>([]);

  useEffect(() => {
    const newCandies: Candy[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 85 + 5,
      y: Math.random() * 85 + 5,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 12 + 18,
      delay: Math.random() * 10,
      type: candyTypes[i % candyTypes.length],
      rotation: Math.random() * 60 - 30,
      opacity: Math.random() * 0.2 + 0.08,
      depth: Math.random(), // Random depth for parallax
    }));
    setCandies(newCandies);
  }, []);

  const memoizedCandies = useMemo(() => candies, [candies]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        background: "linear-gradient(180deg, rgba(247, 243, 236, 0.97) 0%, rgba(247, 243, 236, 0.95) 100%)",
      }}
    >
      {memoizedCandies.map((candy) => (
        <FloatingCandy key={candy.id} candy={candy} />
      ))}
      
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/50 pointer-events-none" />
    </motion.div>
  );
}
