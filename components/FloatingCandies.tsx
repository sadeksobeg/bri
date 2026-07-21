"use client";

import { useEffect, useState } from "react";
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
  depth: number;
}

const candyTypes: Candy["type"][] = ["donut", "cupcake", "macaron", "candy", "chocolate", "cake", "lollipop"];

// Color schemes for variety
const colorSchemes = [
  { primary: "#c9a961", secondary: "#a88b3d", highlight: "#e0c98a" }, // Gold
  { primary: "#e8b4c8", secondary: "#d4a0b5", highlight: "#f5d5e0" }, // Pink
  { primary: "#98d8aa", secondary: "#7bc496", highlight: "#b8e8c0" }, // Green
  { primary: "#a8d8ea", secondary: "#8cc8dc", highlight: "#c8e8f5" }, // Blue
  { primary: "#ffd93d", secondary: "#e6c235", highlight: "#ffe566" }, // Yellow
];

function CandySVG({ type, size, colors }: { type: Candy["type"]; size: number; colors: typeof colorSchemes[0] }) {
  const { primary, secondary, highlight } = colors;

  const baseProps = {
    width: size,
    height: size,
    viewBox: "0 0 60 60",
    fill: "none" as const,
  };

  const cream = "#f7f3ec";
  const brown = "#8B6914";

  switch (type) {
    case "donut":
      return (
        <svg {...baseProps}>
          <circle cx="30" cy="30" r="22" fill={cream} stroke={secondary} strokeWidth="2"/>
          <circle cx="30" cy="30" r="8" fill="#f7f3ec" stroke={secondary} strokeWidth="2"/>
          <circle cx="22" cy="22" r="3" fill={primary}/>
          <circle cx="38" cy="20" r="3" fill={colorSchemes[3].primary}/>
          <circle cx="42" cy="30" r="3" fill={primary}/>
          <circle cx="36" cy="40" r="3" fill={colorSchemes[2].primary}/>
          <circle cx="24" cy="40" r="3" fill={colorSchemes[4].primary}/>
          <circle cx="18" cy="32" r="3" fill={colorSchemes[3].primary}/>
        </svg>
      );
    case "cupcake":
      return (
        <svg {...baseProps}>
          <path d="M15 55 L20 35 L40 35 L45 55 Z" fill={brown} stroke={secondary} strokeWidth="1.5"/>
          <line x1="22" y1="35" x2="22" y2="55" stroke="#5c4410" strokeWidth="0.5" opacity="0.5"/>
          <line x1="30" y1="35" x2="30" y2="55" stroke="#5c4410" strokeWidth="0.5" opacity="0.5"/>
          <line x1="38" y1="35" x2="38" y2="55" stroke="#5c4410" strokeWidth="0.5" opacity="0.5"/>
          <ellipse cx="30" cy="28" rx="18" ry="12" fill={primary} stroke={secondary} strokeWidth="1.5"/>
          <circle cx="30" cy="15" r="5" fill={highlight} stroke={secondary} strokeWidth="1"/>
        </svg>
      );
    case "macaron":
      return (
        <svg {...baseProps}>
          <ellipse cx="30" cy="38" rx="20" ry="10" fill={primary} stroke={secondary} strokeWidth="2"/>
          <rect x="10" y="28" width="40" height="10" fill={highlight}/>
          <ellipse cx="30" cy="28" rx="20" ry="10" fill={primary} stroke={secondary} strokeWidth="2"/>
          <ellipse cx="30" cy="23" rx="16" ry="4" fill={highlight} opacity="0.8"/>
        </svg>
      );
    case "candy":
      return (
        <svg {...baseProps}>
          <circle cx="30" cy="30" r="15" fill={primary} stroke={secondary} strokeWidth="2"/>
          <path d="M15 30 Q5 25 3 30 Q5 35 15 30" fill={primary} stroke={secondary} strokeWidth="1.5"/>
          <path d="M45 30 Q55 25 57 30 Q55 35 45 30" fill={primary} stroke={secondary} strokeWidth="1.5"/>
          <path d="M22 25 Q30 20 38 25" stroke={secondary} strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M22 35 Q30 40 38 35" stroke={secondary} strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "chocolate":
      return (
        <svg {...baseProps}>
          <rect x="12" y="18" width="36" height="24" rx="3" fill={brown} stroke={secondary} strokeWidth="2"/>
          <line x1="24" y1="18" x2="24" y2="42" stroke="#5c4410" strokeWidth="1"/>
          <line x1="36" y1="18" x2="36" y2="42" stroke="#5c4410" strokeWidth="1"/>
          <line x1="12" y1="30" x2="48" y2="30" stroke="#5c4410" strokeWidth="1"/>
          <rect x="14" y="20" width="8" height="8" rx="1" fill={highlight} opacity="0.6"/>
        </svg>
      );
    case "cake":
      return (
        <svg {...baseProps}>
          <rect x="10" y="32" width="40" height="20" rx="2" fill={cream} stroke={secondary} strokeWidth="2"/>
          <rect x="10" y="32" width="40" height="6" fill={primary} stroke={secondary} strokeWidth="1"/>
          <rect x="10" y="42" width="40" height="10" fill={cream} stroke={secondary} strokeWidth="1"/>
          <line x1="20" y1="32" x2="20" y2="52" stroke={secondary} strokeWidth="1" opacity="0.5"/>
          <line x1="30" y1="32" x2="30" y2="52" stroke={secondary} strokeWidth="1" opacity="0.5"/>
          <line x1="40" y1="32" x2="40" y2="52" stroke={secondary} strokeWidth="1" opacity="0.5"/>
          <rect x="26" y="22" width="8" height="12" fill={brown}/>
          <ellipse cx="30" cy="20" rx="4" ry="6" fill={colorSchemes[4].primary}/>
          <ellipse cx="30" cy="16" rx="2" ry="4" fill={colorSchemes[3].primary}/>
        </svg>
      );
    case "lollipop":
      return (
        <svg {...baseProps}>
          <rect x="28" y="40" width="4" height="18" rx="2" fill={cream} stroke={secondary} strokeWidth="1"/>
          <circle cx="30" cy="24" r="18" fill={primary} stroke={secondary} strokeWidth="2"/>
          <path d="M30 6 A18 18 0 0 1 48 24" stroke={secondary} strokeWidth="3" fill="none"/>
          <path d="M30 6 A18 18 0 0 0 12 24" stroke={colorSchemes[3].primary} strokeWidth="3" fill="none"/>
          <path d="M30 42 A18 18 0 0 0 48 24" stroke={secondary} strokeWidth="3" fill="none"/>
          <circle cx="30" cy="24" r="5" fill={cream}/>
        </svg>
      );
    default:
      return null;
  }
}

// Individual candy wrapper with parallax
function FloatingCandy({ candy }: { candy: Candy }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -candy.depth * 80]);
  
  const colors = colorSchemes[candy.id % colorSchemes.length];

  const floatingAnimation = {
    y: [0, -30 - candy.depth * 20, 0],
    x: [0, 15 * (candy.id % 2 === 0 ? 1 : -1), 0, 10 * (candy.id % 2 === 0 ? -1 : 1), 0],
    rotate: [candy.rotation, candy.rotation + 10, candy.rotation - 5, candy.rotation + 15, candy.rotation],
    scale: [1, 1.05, 0.95, 1.02, 1],
    transition: {
      duration: candy.duration,
      delay: candy.delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
      times: [0, 0.25, 0.5, 0.75, 1] as [number, number, number, number, number],
    },
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${candy.x}%`,
        top: `${candy.y}%`,
        width: candy.size,
        height: candy.size,
        y,
        filter: `drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))`,
      }}
      animate={floatingAnimation}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: candy.opacity, scale: 1 }}
      viewport={{ once: false }}
      transition={{
        duration: 1,
        delay: candy.delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }}
    >
      <CandySVG type={candy.type} size={candy.size} colors={colors} />
    </motion.div>
  );
}

export default function FloatingCandies() {
  const [candies, setCandies] = useState<Candy[]>([]);

  useEffect(() => {
    const newCandies: Candy[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 50 + 40,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 8,
      type: candyTypes[i % candyTypes.length],
      rotation: Math.random() * 60 - 30,
      opacity: Math.random() * 0.5 + 0.35,
      depth: Math.random(),
    }));
    setCandies(newCandies);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
      style={{ isolation: "isolate" }}
    >
      {candies.map((candy) => (
        <FloatingCandy key={candy.id} candy={candy} />
      ))}
    </div>
  );
}
