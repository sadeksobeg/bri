"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
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
  const [showContent, setShowContent] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const loadTimer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1a3d] via-[#0f2744] to-[#1a1a2e]">
      {/* Full-Screen Slider Background */}
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
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt={`عرض ${currentSlide + 1}`}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              quality={90}
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3d] via-[#0b1a3d]/60 to-[#0b1a3d]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3d]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ambient floating particles - Desktop only */}
      <div className="absolute inset-0 overflow-hidden max-md:hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/30"
            initial={{ 
              x: `${20 + i * 15}%`, 
              y: `${30 + (i % 3) * 20}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [null, `${20 + (i % 4) * 15}%`],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        
        {/* Top Section - Logo & Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-between p-4 sm:p-6 lg:p-8"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/50 shadow-lg shadow-gold/20 sm:h-14 sm:w-14">
              <Image
                src="/brand/logo.png"
                alt="BRIVIA"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
            </div>
            <div>
              <h1 className="font-['Amiri'] text-xl font-bold tracking-wider text-gold sm:text-2xl lg:text-3xl">
                BRIVIA
              </h1>
              <p className="hidden text-[8px] tracking-[0.25em] text-gold/50 sm:block sm:text-[9px]">
                PREMIUM CONFECTIONERY
              </p>
            </div>
          </div>

          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 backdrop-blur-md sm:px-4"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            <span className="text-[10px] font-medium tracking-wider text-gold sm:text-xs">
              حلويات فاخرة
            </span>
          </motion.div>
        </motion.div>

        {/* Center Content - Taglines */}
        <motion.div 
          className="flex flex-1 flex-col items-center justify-center px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <p className="font-['Amiri'] text-3xl text-gold sm:text-4xl lg:text-5xl">
              فخامة في كل قطعة
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-sm text-sm leading-relaxed text-cream/70 sm:text-base lg:max-w-md"
          >
            حيث تلتقي الحرفية بالفخامة، نقدم لك تجربة حلوى استثنائية لا تُنسى
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold/90 px-6 py-3 text-sm font-medium text-navy shadow-lg shadow-gold/30 transition-shadow duration-300 hover:shadow-gold/50 sm:px-8 sm:py-4"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              استكشف مجموعتنا
            </motion.a>

            <motion.a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border-2 border-gold/50 px-6 py-3 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 sm:px-8 sm:py-4"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Slider Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pb-8 pt-4"
        >
          {/* Slide Indicators */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative"
              >
                <motion.div
                  animate={{ width: index === currentSlide ? 32 : 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "bg-gradient-to-r from-gold to-gold/80 shadow-lg shadow-gold/40" 
                      : "bg-gold/30 hover:bg-gold/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Features Row */}
          <div className="flex items-center justify-center gap-x-4 gap-y-2 text-xs text-cream/50 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              تغليف فاخر
            </span>
            <span className="h-4 w-px bg-gold/20" />
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              جودة حرفية
            </span>
            <span className="hidden h-4 w-px bg-gold/20 sm:block" />
            <span className="hidden items-center gap-1.5 sm:flex">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              توصيل سريع
            </span>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="text-[9px] tracking-[0.15em] text-gold/30 sm:text-[10px]">
              مرر للأسفل
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gold/30"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
