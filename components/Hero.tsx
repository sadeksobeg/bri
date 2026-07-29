"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/showcase/slide1.png" },
  { src: "/showcase/slide2.png" },
  { src: "/showcase/slide3.png" },
  { src: "/showcase/slide4.png" },
  { src: "/showcase/slide5.png" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt="BRIVIA"
              fill
              priority={currentSlide === 0}
              className="object-cover"
              quality={95}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[150px]" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-amber-400/5 blur-[100px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between p-6 sm:p-10 lg:p-16">
        
        {/* Top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-[0_0_40px_rgba(251,191,36,0.3)] sm:h-16 sm:w-16"
            >
              <Image
                src="/brand/logo.png"
                alt="BRIVIA"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </motion.div>
            <div>
              <span className="font-['Amiri'] text-2xl font-bold tracking-widest text-white sm:text-3xl">
                BRI<span className="text-amber-400">v</span>IA
              </span>
              <p className="hidden text-[8px] tracking-[0.3em] text-amber-400/60 sm:block sm:text-[9px]">
                PREMIUM CONFECTIONERY
              </p>
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(251,191,36,0.4)] transition-all duration-500 hover:shadow-[0_10px_60px_rgba(251,191,36,0.6)] hover:bg-[position:100%_0] sm:px-8 sm:py-4"
          >
            <span className="relative z-10 flex items-center gap-2">
              اكتشف مجموعتنا
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        </motion.div>

        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl"
        >
          {/* Pre-heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="text-xs tracking-[0.4em] text-amber-400/80 sm:text-sm">
              EST. 2024
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6 font-['Amiri'] text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
          >
            فخامة
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent"> لا تُضاهى </span>
            <br />
            في كل قضمة
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            حيث تلتقي الحرفية العربية بالفخامة العالمية، نصنع لك تجربة حلوى استثنائية لا تُنسى
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-8 py-4 text-base font-semibold text-black shadow-[0_10px_40px_rgba(251,191,36,0.4)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(251,191,36,0.6)] hover:bg-[position:100%_0]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              اطلب الآن
            </motion.a>
            
            <motion.a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-md transition-all hover:border-amber-500/50 hover:bg-amber-500/10"
            >
              <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              واتساب
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-12 flex gap-12"
          >
            {[
              { num: "100%", label: "طبيعي" },
              { num: "500+", label: "عميل" },
              { num: "50+", label: "منتج" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-amber-400 sm:text-3xl">{stat.num}</div>
                <div className="text-xs tracking-wider text-white/40 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom - Slider Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex items-end justify-between"
        >
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group relative"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? "w-12 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Counter */}
          <div className="flex items-center gap-4">
            <span className="font-['Amiri'] text-3xl font-bold text-amber-400">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="text-white/50">{String(slides.length).padStart(2, '0')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
