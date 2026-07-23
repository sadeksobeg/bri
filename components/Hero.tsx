"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/showcase/slide1.png", alt: "كيك فاخر" },
  { src: "/showcase/slide2.png", alt: "ألواح شوكولاتة" },
  { src: "/showcase/slide3.png", alt: "تروس شوكولاتة" },
  { src: "/showcase/slide4.png", alt: "طاولة حلويات" },
  { src: "/showcase/slide5.png", alt: "تروس داكنة" },
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") prevSlide();
      if (e.key === "ArrowLeft") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-gold/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-tl from-gold/10 to-transparent blur-3xl"
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* LEFT SIDE: 3D Cube Slideshow */}
        <div 
          className="flex w-full items-center justify-center p-8 lg:w-[55%]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cube Container */}
          <div className="relative w-full max-w-[600px]">
            
            {/* Outer glow ring */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.02, 1],
              }}
              transition={{ 
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute inset-[-20px] rounded-3xl border border-gold/10"
            />
            
            {/* Frame border */}
            <div className="relative overflow-hidden rounded-2xl border border-gold/30 shadow-2xl shadow-gold/10">
              {/* 3D Flip Container */}
              <div className="relative aspect-square w-full overflow-hidden">
                
                {/* Image Slides */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ 
                      rotateY: direction > 0 ? 90 : -90,
                      opacity: 0,
                      scale: 0.9,
                    }}
                    animate={{ 
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{ 
                      rotateY: direction > 0 ? -90 : 90,
                      opacity: 0,
                      scale: 0.9,
                    }}
                    transition={{
                      rotateY: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.4 },
                    }}
                    style={{ 
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                    className="absolute inset-0"
                  >
                    {/* Image with Ken Burns */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src={slides[currentSlide].src}
                        alt={slides[currentSlide].alt}
                        fill
                        priority={currentSlide === 0}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover"
                        quality={95}
                      />
                    </motion.div>

                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-black/10" />
                  </motion.div>
                </AnimatePresence>

                {/* Corner accents */}
                <div className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2 border-gold/50" />
                <div className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2 border-gold/50" />
                <div className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2 border-gold/30" />
                <div className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2 border-gold/30" />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy/60 p-3 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-navy/80 hover:text-gold-light hover:scale-110 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-navy/60 p-3 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-navy/80 hover:text-gold-light hover:scale-110 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Pause indicator */}
              <AnimatePresence>
                {isPaused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-gold/30 bg-navy/60 px-3 py-1 text-xs text-gold/80 backdrop-blur-sm"
                  >
                    ⏸
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative h-2 rounded-full transition-all duration-300"
                >
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "w-8 bg-gradient-to-r from-gold to-gold/70" 
                      : "w-2 bg-gold/30 hover:bg-gold/50"
                  }`} />
                  {index === currentSlide && (
                    <motion.div
                      layoutId="cubeIndicator"
                      className="absolute inset-0 rounded-full bg-gold/20 blur-sm"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Floating particles around cube */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gold/40"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Content */}
        <div className="hidden w-[45%] items-center lg:flex">
          <div className="relative w-full max-w-lg px-8">
            
            {/* Decorative elements */}
            <div className="absolute -left-20 top-1/4 h-px w-32 bg-gradient-to-r from-gold/50 to-transparent" />
            <div className="absolute -left-20 top-1/3 h-px w-20 bg-gradient-to-r from-gold/30 to-transparent" />
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 rounded-full border border-dashed border-gold/20"
                />
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-gold/50 shadow-lg shadow-gold/20">
                  <Image
                    src="/brand/logo.png"
                    alt="BRIVIA"
                    fill
                    priority
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-glow font-[family-name:var(--font-heading)] text-6xl font-bold tracking-[0.2em] text-gold xl:text-7xl"
            >
              BRIVIA
            </motion.h1>

            {/* Elegant Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="my-6 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
              <svg className="h-6 w-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              <div className="h-px flex-1 bg-gradient-to-l from-gold/60 to-transparent" />
            </motion.div>

            {/* Taglines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="space-y-2"
            >
              <p className="font-[family-name:var(--font-heading)] text-2xl text-cream/90 xl:text-3xl">
                فخامة في كل قطعة
              </p>
              <p className="text-[10px] tracking-[0.6em] text-gold/60 xl:text-xs">
                PREMIUM CONFECTIONERY
              </p>
            </motion.div>

            {/* Animated Tagline Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="relative mt-8"
            >
              <div className="relative rounded-xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-5 backdrop-blur-sm">
                <div className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold/40" />
                <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold/40" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-cream/70"
                  >
                    {slides[currentSlide].alt}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold/80 px-8 py-4 text-sm font-medium text-navy shadow-lg shadow-gold/30 transition-shadow duration-300 hover:shadow-gold/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  استكشف مجموعتنا
                </span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/963995939432"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group rounded-full border-2 border-gold/50 px-8 py-4 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل معنا
                </span>
              </motion.a>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-cream/40"
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                تغليف فاخر
              </span>
              <span className="h-4 w-px bg-gold/20" />
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                جودة حرفية
              </span>
              <span className="h-4 w-px bg-gold/20" />
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                توصيل سريع
              </span>
            </motion.div>

            {/* Decorative bottom element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/20" />
                <svg className="h-4 w-4 text-gold/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Content (shown below cube on small screens) */}
        <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
          <div className="bg-gradient-to-t from-navy via-navy/95 to-transparent p-6 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-glow font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[0.2em] text-gold">
                BRIVIA
              </h1>
              <p className="mt-2 font-[family-name:var(--font-heading)] text-lg text-cream/90">
                فخامة في كل قطعة
              </p>
              <p className="text-[10px] tracking-[0.4em] text-gold/60">
                PREMIUM CONFECTIONERY
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex justify-center gap-4"
            >
              <a
                href="#products"
                className="rounded-full bg-gradient-to-r from-gold to-gold/80 px-6 py-3 text-sm font-medium text-navy shadow-lg shadow-gold/30"
              >
                استكشف مجموعتنا
              </a>
              <a
                href="https://wa.me/963995939432"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold/50 px-6 py-3 text-sm font-medium text-gold"
              >
                تواصل معنا
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/30 max-lg:hidden"
      >
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .particle {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
