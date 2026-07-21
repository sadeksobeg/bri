"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import type { ProductDTO } from "@/lib/types";

type Props = {
  product: ProductDTO;
  index: number;
  onOrder: (product: ProductDTO) => void;
};

export default function ProductCard({ product, index, onOrder }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const isTall = index % 3 === 1;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ 
        duration: 0.6, 
        delay: (index % 6) * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ perspective: 1000 }}
      className={`group relative ${isTall ? "md:row-span-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ 
          rotateX: isHovered ? rotateX : 0, 
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative h-full overflow-hidden rounded-3xl bg-white shadow-soft-lg transition-all duration-500 ${
          isHovered 
            ? "shadow-float border border-gold/30" 
            : "shadow-soft border border-transparent"
        }`}
      >
        {/* Premium Border Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-gold/20" />
          <div className="absolute inset-0 rounded-3xl border-2 border-gold/40" />
        </div>

        {/* Image Section */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-cream-dark to-cream ${
          isTall ? "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[480px]" : "aspect-square"
        }`}>
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={product.image || "/brand/packaging.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 0.9 : 0.6 }}
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent"
          />

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="absolute top-4 right-4"
          >
            <span className="badge-premium backdrop-blur-sm">
              {product.category}
            </span>
          </motion.div>

          {/* Premium Badge for tall cards */}
          {isTall && (
            <div className="absolute top-4 left-4">
              <span className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-navy/80 px-3 py-1.5 text-xs text-gold backdrop-blur-sm">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                مميز
              </span>
            </div>
          )}

          {/* Quick View Button on Hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
          >
            <button
              type="button"
              onClick={() => onOrder(product)}
              className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-navy shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-navy"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              عرض التفاصيل
            </button>
          </motion.div>

          {/* Bottom Image Corner Decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="relative z-10 p-6">
          {/* Decorative Line */}
          <motion.div
            animate={{ scaleX: isHovered ? 1 : 0, width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 mx-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          />

          <div className="space-y-4">
            {/* Product Name */}
            <motion.h3
              animate={{ color: isHovered ? "#a88b3d" : "#0b1a3d" }}
              transition={{ duration: 0.3 }}
              className="font-[family-name:var(--font-heading)] font-bold leading-tight"
              style={{ fontSize: 'var(--text-h2)' }}
            >
              {product.name}
            </motion.h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-relaxed text-navy/55 transition-colors duration-300 group-hover:text-navy/70">
              {product.description}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent" />
              <div className="h-1.5 w-1.5 rounded-full bg-gold/40" />
              <div className="h-px flex-1 bg-gradient-to-l from-gold/20 to-transparent" />
            </div>

            {/* CTA */}
            <div className="flex items-center justify-end">
              <motion.button
                type="button"
                onClick={() => onOrder(product)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-navy to-navy-light px-6 py-3 text-sm font-medium text-gold shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-navy/30"
              >
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                <svg className="relative h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="relative">اطلب الآن</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating Corner Decorations */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="corner-decoration top-left" />
          <div className="corner-decoration top-right" />
          <div className="corner-decoration bottom-left" />
          <div className="corner-decoration bottom-right" />
        </div>

        {/* Shimmer effect on hover */}
        <div className={`pointer-events-none absolute inset-0 overflow-hidden rounded-3xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
