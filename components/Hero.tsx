"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingDot {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Hero() {
  const [dots, setDots] = useState<FloatingDot[]>([]);

  useEffect(() => {
    // Reduced from 30 to just 8 subtle ambient dots
    const newDots: FloatingDot[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
    }));
    setDots(newDots);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy py-16 sm:py-28">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Subtle gradient mesh */}
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-[0.06]" />
        
        {/* Fine grid pattern - subtle and refined */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(201, 169, 97, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 97, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }} />
      </div>

      {/* Ambient floating dots - only animation element */}
      <div className="particles-container opacity-40">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="particle"
          />
        ))}
      </div>

      {/* Single elegant rotating ring */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.06]"
        />
      </div>

      {/* Central ambient glow - subtle and fixed */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-radial-gold opacity-[0.08] blur-[120px]" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="relative mb-12">
          {/* Soft glow behind logo */}
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border-[2px] border-gold/40 shadow-[0_0_60px_-15px_rgba(201,169,97,0.3)]"
          >
            <Image
              src="/brand/logo.png"
              alt="BRIVIA Logo"
              fill
              className="object-cover"
              sizes="176px"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-heading)] font-bold tracking-[0.15em] text-gold"
          style={{ fontSize: 'var(--text-display)', textShadow: '0 0 40px rgba(201, 169, 97, 0.2)' }}
        >
          BRIVIA
        </motion.h1>

        {/* Elegant divider */}
        <motion.div
          variants={itemVariants}
          className="my-8 flex items-center gap-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/50">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="font-[family-name:var(--font-amiri)] text-lg tracking-[0.3em] text-cream/60 sm:text-xl"
        >
          حلويات فاخرة
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-1 text-[10px] tracking-[0.6em] text-gold/40 sm:text-xs"
        >
          PREMIUM CONFECTIONERY
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mt-12 max-w-xl text-sm leading-relaxed text-cream/50 sm:text-base"
        >
          تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة، صُممت لتُبهج الحواس في كل قضمة
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold"
          >
            استكشف المجموعة
          </motion.a>

          <motion.a
            href="https://wa.me/963995939432"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل معنا
          </motion.a>
        </motion.div>

        {/* Feature pills - inline info row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 text-xs text-cream/40"
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            تغليف فاخر
          </span>
          <span className="border-r border-gold/15 h-3" />
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            جودة حرفية
          </span>
          <span className="border-r border-gold/15 h-3" />
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            توصيل سريع
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom subtle wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 70C120 60 240 40 360 35C480 30 600 35 720 40C840 45 960 50 1080 50C1200 50 1320 45 1380 42L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="url(#hero-cream)"
            fillOpacity="0.08"
          />
          <defs>
            <linearGradient id="hero-cream" x1="720" y1="0" x2="720" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c9a961"/>
              <stop offset="1" stopColor="#c9a961" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
