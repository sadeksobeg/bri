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
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") prevSlide();
      if (e.key === "ArrowLeft") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b1a3d] via-[#0f2744] to-[#1a1a2e]">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], x: [-30, 30, -30], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], y: [-20, 20, -20], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-[#d4af37]/15 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-transparent blur-[60px]"
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* LEFT SIDE: 3D Cube Slideshow */}
        <div 
          className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-[58%]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-[520px]">
            
            {/* Outer decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border border-[#d4af37]/10 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-35px] rounded-full border border-[#d4af37]/5"
            />
            
            {/* Main cube frame */}
            <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#0b1a3d]/40 shadow-2xl shadow-[#d4af37]/20 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl border border-[#d4af37]/20" />
              
              {/* 3D Cube Container */}
              <div className="relative aspect-square w-full" style={{ perspective: 1200 }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                    animate={{ rotateY: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                    transition={{ rotateY: { duration: 1, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.4 }, scale: { duration: 0.5 }, filter: { duration: 0.4 } }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="absolute inset-0"
                  >
                    {/* Image with Ken Burns effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <motion.div
                        className="absolute inset-[-10%]"
                        animate={{ scale: [1.15, 1.25, 1.15], rotate: [0, 2, 0, -2, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Image
                          src={slides[currentSlide].src}
                          alt={`عرض ${currentSlide + 1}`}
                          fill
                          priority={currentSlide === 0}
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="object-cover"
                          quality={95}
                        />
                      </motion.div>

                      {/* Light reflection */}
                      <motion.div
                        animate={{ x: ["-100%", "200%"], opacity: [0, 0.1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />

                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-black/25" />
                    </div>

                    {/* Floating particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full bg-[#d4af37]/70"
                        style={{ left: `${12 + i * 14}%`, top: `${18 + (i % 3) * 25}%` }}
                        animate={{ y: [-25, 25, -25], opacity: [0.2, 0.7, 0.2], scale: [0.7, 1.3, 0.7] }}
                        transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Corner accents */}
                <motion.div className="absolute left-3 top-3 h-10 w-10 border-l-2 border-t-2 border-[#d4af37]/70"
                  animate={{ borderColor: ['rgba(212,175,55,0.7)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.7)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div className="absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-[#d4af37]/70"
                  animate={{ borderColor: ['rgba(212,175,55,0.7)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.7)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-[#d4af37]/30" />
                <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-[#d4af37]/30" />

                {/* Navigation Arrows */}
                <button onClick={prevSlide} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#d4af37]/20 p-3 text-[#d4af37] backdrop-blur-md transition-all duration-300 hover:bg-[#d4af37]/40 hover:scale-110 active:scale-95 border border-[#d4af37]/30">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button onClick={nextSlide} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#d4af37]/20 p-3 text-[#d4af37] backdrop-blur-md transition-all duration-300 hover:bg-[#d4af37]/40 hover:scale-110 active:scale-95 border border-[#d4af37]/30">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Pause indicator */}
                <AnimatePresence>
                  {isPaused && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#d4af37]/40 bg-[#0b1a3d]/80 px-4 py-1.5 text-xs text-[#d4af37]/90 backdrop-blur-md">
                      ⏸
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slide counter */}
                <div className="absolute bottom-3 right-3 z-10 rounded-full border border-[#d4af37]/30 bg-[#0b1a3d]/60 px-3 py-1 text-xs text-[#d4af37]/80 backdrop-blur-sm font-medium">
                  {currentSlide + 1} / {slides.length}
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index)} className="group relative">
                  <motion.div
                    animate={{ width: index === currentSlide ? 36 : 10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-gradient-to-r from-[#d4af37] to-[#f5d67a] shadow-lg shadow-[#d4af37]/40" : "bg-[#d4af37]/30 hover:bg-[#d4af37]/50"}`}
                  />
                  {index === currentSlide && (
                    <motion.div layoutId="cubeIndicator" className="absolute inset-0 -z-10 rounded-full bg-[#d4af37]/20 blur-md" transition={{ duration: 0.5 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-[#d4af37]/10">
              <motion.div key={currentSlide} initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 4.5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5d67a]" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="hidden w-[42%] items-center lg:flex">
          <div className="relative w-full max-w-md px-6">
            
            {/* Decorative vertical line */}
            <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.3 }} 
              className="absolute -left-12 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />

            {/* Brand Name - Split Letter Animation */}
            <div className="overflow-hidden">
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h1 className="text-[#d4af37] font-['Amiri'] text-7xl font-bold tracking-[0.15em] xl:text-8xl drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                  BRIVIA
                </h1>
              </motion.div>
            </div>

            {/* Elegant Divider */}
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
              className="my-6 flex items-center gap-4">
              <motion.div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
              <motion.svg className="h-6 w-6 text-[#d4af37]" viewBox="0 0 24 24" fill="currentColor" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </motion.svg>
              <motion.div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/60" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
            </motion.div>

            {/* Taglines */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}
              className="space-y-2">
              <p className="font-['Amiri'] text-3xl text-[#f5f5dc]/90 xl:text-4xl">
                فخامة في كل قطعة
              </p>
              <motion.p className="text-[10px] tracking-[0.5em] text-[#d4af37]/50 xl:text-xs"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}>
                حلويات فاخرة
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-5 max-w-sm text-sm leading-relaxed text-[#f5f5dc]/45">
              حيث تلتقي الحرفية بالفخامة، نقدم لك تجربة حلوى استثنائية لا تُنسى
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-8 flex flex-wrap gap-4">
              <motion.a href="#products" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d67a] px-8 py-4 text-sm font-medium text-[#0b1a3d] shadow-lg shadow-[#d4af37]/30 transition-shadow duration-300 hover:shadow-[#d4af37]/50">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  استكشف مجموعتنا
                </span>
              </motion.a>
              
              <motion.a href="https://wa.me/963995939432" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="rounded-full border-2 border-[#d4af37]/50 px-8 py-4 text-sm font-medium text-[#d4af37] transition-all duration-300 hover:border-[#d4af37] hover:bg-[#d4af37]/10">
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل معنا
                </span>
              </motion.a>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#f5f5dc]/35">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#d4af37]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                تغليف فاخر
              </span>
              <span className="h-4 w-px bg-[#d4af37]/20" />
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#d4af37]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                جودة حرفية
              </span>
              <span className="h-4 w-px bg-[#d4af37]/20" />
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#d4af37]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                توصيل سريع
              </span>
            </motion.div>

            {/* Bottom decoration */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}
              className="mt-14">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/20" />
                <svg className="h-4 w-4 text-[#d4af37]/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/20" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
          <div className="bg-gradient-to-t from-[#0b1a3d] via-[#0b1a3d]/95 to-transparent p-5 pt-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <h1 className="text-[#d4af37] font-['Amiri'] text-5xl font-bold tracking-[0.1em] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                BRIVIA
              </h1>
              <p className="mt-2 font-['Amiri'] text-lg text-[#f5f5dc]/90">
                فخامة في كل قطعة
              </p>
              <p className="text-[9px] tracking-[0.4em] text-[#d4af37]/50">
                حلويات فاخرة
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-5 flex justify-center gap-3">
              <a href="#products" className="rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d67a] px-5 py-2.5 text-xs font-medium text-[#0b1a3d] shadow-lg shadow-[#d4af37]/30">
                استكشف مجموعتنا
              </a>
              <a href="https://wa.me/963995939432" target="_blank" rel="noopener noreferrer"
                className="rounded-full border border-[#d4af37]/50 px-5 py-2.5 text-xs font-medium text-[#d4af37]">
                تواصل معنا
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-[#d4af37]/25 max-lg:hidden">
        <span className="text-[9px] tracking-[0.2em]">مرر للأسفل</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
