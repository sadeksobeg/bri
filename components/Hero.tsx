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
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextSlide();
          return 0;
        }
        return p + 2;
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Full-Screen Slider */}
      <div 
        className="absolute inset-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt={`BRIVIA Premium ${currentSlide + 1}`}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              quality={95}
            />
            {/* Multi-layer overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-gold/60"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0
              }}
              animate={{ 
                y: [null, -100 - Math.random() * 200],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        
        {/* Top Bar - Logo & CTA */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between px-6 py-5 lg:px-12"
        >
          {/* Premium Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gold/60 shadow-[0_0_30px_rgba(212,175,55,0.3)] lg:h-16 lg:w-16"
            >
              <Image
                src="/brand/logo.png"
                alt="BRIVIA"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent" />
            </motion.div>
            <div>
              <h1 className="font-['Amiri'] text-2xl font-bold tracking-[0.2em] text-gold lg:text-3xl">
                BRIVIA
              </h1>
              <p className="text-[9px] tracking-[0.4em] text-gold/60 lg:text-[10px]">
                PREMIUM CONFECTIONERY
              </p>
            </div>
          </div>

          {/* Premium CTA */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold to-gold/80 px-6 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(212,175,55,0.4)] transition-shadow duration-500 hover:shadow-[0_10px_60px_rgba(212,175,55,0.6)] lg:px-8 lg:py-4"
          >
            <span className="relative z-10 flex items-center gap-2">
              اكتشف مجموعتنا
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.a>
        </motion.header>

        {/* Main Content - Center */}
        <div className="flex flex-1 items-center">
          <div className="w-full px-6 lg:px-12">
            <div className="mx-auto max-w-3xl lg:mx-0">
              
              {/* Pre-heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="text-xs tracking-[0.4em] text-gold/60 lg:text-sm">
                  ESTABLISHED 2024
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mb-4 font-['Amiri'] text-4xl leading-tight text-white lg:text-6xl xl:text-7xl"
              >
                <span className="block text-gold">فخامة</span>
                <span className="block">لا تُضاهى</span>
              </motion.h2>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8 max-w-lg text-base leading-relaxed text-white/70 lg:text-lg"
              >
                حيث تلتقي الحرفية العربية بالفخامة العالمية، نصنع لك تجربة حلوى استثنائية
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap items-center gap-4"
              >
                <motion.a
                  href="https://wa.me/963995939432"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-md transition-all hover:border-gold/50 hover:bg-gold/10 lg:px-8 lg:py-4"
                >
                  <svg className="h-6 w-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm font-medium text-white">اطلب الآن</span>
                </motion.a>
              </motion.div>

              {/* Stats/Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-12 flex flex-wrap gap-8 lg:gap-12"
              >
                {[
                  { number: "100%", label: "طبيعي" },
                  { number: "24/7", label: "خدمة" },
                  { number: "50+", label: "منتج" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-gold lg:text-3xl">{stat.number}</div>
                    <div className="text-xs tracking-wider text-white/50 lg:text-sm">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom - Slider Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="px-6 pb-8 lg:px-12 lg:pb-12"
        >
          {/* Progress Bar */}
          <div className="mx-auto mb-6 max-w-3xl lg:mx-0 lg:max-w-md">
            <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold/60"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? "w-8 bg-gradient-to-r from-gold to-gold/70 shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/70">
                <span className="text-xl font-bold text-gold">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="mx-2 text-white/30">/</span>
                <span className="text-white/50">{String(slides.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="mt-8 flex flex-col items-center gap-2 lg:mt-12">
            <span className="text-[10px] tracking-[0.3em] text-white/30">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/30"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Side Decoration - Desktop */}
      <div className="pointer-events-none absolute bottom-12 left-12 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-4"
        >
          <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          <div className="space-y-2">
            <div className="h-1 w-1 rounded-full bg-gold/60" />
            <div className="h-1 w-1 rounded-full bg-gold/40" />
            <div className="h-1 w-1 rounded-full bg-gold/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
