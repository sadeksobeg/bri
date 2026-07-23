"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/showcase/slide1-hq.png",
    alt: "تشكيلة شوكولاتة فاخرة",
    title: "تشكيلة استثنائية",
    description: "من أجود أنواع الكاكاو الطبيعي",
  },
  {
    src: "/showcase/slide2.png",
    alt: "أصناف شوكولاتة",
    title: "فن وحرفية",
    description: "صُنعت بأيدي أمهر الحرفيين",
  },
  {
    src: "/showcase/slide3.png",
    alt: "حلويات مميزة",
    title: "لأجمل المناسبات",
    description: "ضيف لمسة فاخرة على لحظاتك",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch/Swipe support
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) nextSlide();
      if (diff < -50) prevSlide();
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* FULL-SCREEN BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          >
            <div
              className={`absolute inset-0 ${
                index === currentSlide ? "animate-ken-burns" : ""
              }`}
              style={{
                animationDuration: "10s",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
              }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{
                  transform: index === currentSlide ? "scale(1.15)" : "scale(1)",
                  transition: "transform 10s ease-out",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* STRONG DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Elegant side accent line */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent" />

      {/* DECORATIVE ELEMENTS */}
      {/* Top right corner decoration */}
      <div className="pointer-events-none absolute right-0 top-0 opacity-10">
        <svg className="h-64 w-64 text-gold" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="160" cy="40" r="100" />
          <circle cx="160" cy="40" r="120" />
          <circle cx="160" cy="40" r="140" />
        </svg>
      </div>

      {/* Bottom decorative line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${15 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT - LEFT SIDE (60%) */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="w-full max-w-2xl px-8 sm:px-12 md:px-16 lg:px-20">
          
          {/* Logo with glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-10"
          >
            {/* Glow rings behind logo */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="h-44 w-44 rounded-full bg-gold/20 blur-3xl"
                />
              </div>
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-gold/60 shadow-gold-xl sm:h-40 sm:w-40">
                <Image
                  src="/brand/logo.png"
                  alt="BRIVIA Logo"
                  fill
                  priority
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>
          </motion.div>

          {/* Brand Name with shimmer */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center font-[family-name:var(--font-heading)] text-5xl font-bold tracking-[0.25em] text-gold sm:text-6xl lg:text-7xl text-glow"
          >
            BRIVIA
          </motion.h1>

          {/* Elegant divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="my-8 flex items-center justify-center gap-5"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/60" />
            <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Main Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-center font-[family-name:var(--font-heading)] text-2xl text-cream/90 sm:text-3xl"
          >
            فخامة في كل قطعة
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-2 text-center text-xs tracking-[0.5em] text-gold/60 sm:text-sm"
          >
            PREMIUM CONFECTIONERY
          </motion.p>

          {/* Slide-specific content with elegant card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <div className="relative rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-6 backdrop-blur-sm">
                {/* Corner decorations */}
                <div className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-gold/40" />
                <div className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold/40" />
                
                <h2 className="text-center font-[family-name:var(--font-heading)] text-xl text-gold-light sm:text-2xl">
                  {slides[currentSlide].title}
                </h2>
                <p className="mt-2 text-center text-sm text-cream/70">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons - Elegant style */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a 
              href="#products" 
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold/80 px-8 py-4 text-sm font-medium text-navy shadow-gold-lg transition-all duration-300 hover:shadow-gold-xl hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                استكشف مجموعتنا
              </span>
            </a>
            
            <a 
              href="https://wa.me/963995939432" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group rounded-full border-2 border-gold/60 px-8 py-4 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                تواصل معنا
              </span>
            </a>
          </motion.div>

          {/* Premium features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-cream/50"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              تغليف فاخر
            </span>
            <span className="h-4 w-px bg-gold/20" />
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              جودة حرفية
            </span>
            <span className="h-4 w-px bg-gold/20" />
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              توصيل سريع
            </span>
          </motion.div>

          {/* Slide Indicators - Elegant style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            {slides.map((_, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? "w-12 bg-gold" 
                      : "w-1.5 bg-gold/30 hover:bg-gold/50"
                  }`}
                  aria-label={`انتقل إلى الشريحة ${index + 1}`}
                />
                {index === currentSlide && (
                  <motion.div
                    layoutId="slideIndicator"
                    className="absolute inset-0 h-1.5 rounded-full bg-gold/40"
                    initial={false}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 flex flex-col items-center gap-2 text-gold/40"
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
        </div>
      </div>

      {/* Navigation Arrows - On the image side */}
      <button
        onClick={prevSlide}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-navy/50 p-4 text-gold opacity-0 transition-all duration-300 hover:bg-navy/70 hover:text-gold-light hover:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
        aria-label="الشريحة السابقة"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-navy/50 p-4 text-gold opacity-0 transition-all duration-300 hover:bg-navy/70 hover:text-gold-light hover:opacity-100 group-hover:opacity-100 max-lg:opacity-100"
        aria-label="الشريحة التالية"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-gold/30 bg-navy/60 px-4 py-2 text-xs text-gold/80 backdrop-blur-sm"
          >
            ⏸ متوقف مؤقتاً
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
