"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/showcase/slide1.png",
    alt: "ترفيل فاخر",
    title: "ترفيل مميز",
    description: "من أجود أنواع الشوكولاتة",
  },
  {
    src: "/showcase/slide2.png",
    alt: "شوكولاتة فاخرة",
    title: "شوكولاتة حرفية",
    description: "صُنعت بعناية فائقة",
  },
  {
    src: "/showcase/slide3.png",
    alt: "طاولة حلويات",
    title: "حلويات مميزة",
    description: "لأجمل المناسبات",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

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
    
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slideshow with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
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
                animationDuration: "8s",
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
                className="object-cover scale-[1.15]"
                style={{
                  transform: index === currentSlide ? "scale(1.15)" : "scale(1)",
                  transition: "transform 8s ease-out",
                }}
              />
            </div>
          </div>
        ))}
        
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/30 via-transparent to-navy/30" />
        
        {/* Animated particles */}
        <div className="particles-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute left-10 top-1/4 z-10 opacity-20">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-32 w-32 rounded-full border border-gold/30"
        />
      </div>
      <div className="pointer-events-none absolute right-20 bottom-1/3 z-10 opacity-20">
        <motion.div
          animate={{ y: [10, -15, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="h-24 w-24 rounded-full border border-gold/20"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Logo with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mx-auto mb-10"
          >
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-40 w-40 rounded-full bg-gold/10 blur-2xl"
              />
            </div>
            
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-2 border-gold/50 shadow-gold-xl sm:h-44 sm:w-44">
              <Image
                src="/brand/logo.png"
                alt="BRIVIA Logo"
                fill
                priority
                className="object-cover"
                sizes="176px"
              />
            </div>
          </motion.div>

          {/* Brand Name with shimmer */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-[0.2em] text-gold sm:text-6xl lg:text-7xl text-glow"
          >
            BRIVIA
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="my-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-amiri text-2xl text-cream/80 sm:text-3xl"
          >
            حلويات فاخرة
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-2 text-xs tracking-[0.5em] text-gold/50 sm:text-sm"
          >
            PREMIUM CONFECTIONERY
          </motion.p>

          {/* Slide-specific content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-xl text-gold-light sm:text-2xl">
                {slides[currentSlide].title}
              </h2>
              <p className="mt-2 text-sm text-cream/60">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="#products" className="btn-gold">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              استكشف المجموعة
            </a>
            <a 
              href="https://wa.me/963995939432" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-outline"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 text-xs text-cream/40"
          >
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              تغليف فاخر
            </span>
            <span className="h-3 w-px bg-gold/15" />
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              جودة حرفية
            </span>
            <span className="h-3 w-px bg-gold/15" />
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              توصيل سريع
            </span>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-navy/50 p-3 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-navy/70 hover:text-gold-light sm:left-8"
        aria-label="الشريحة السابقة"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-navy/50 p-3 text-gold backdrop-blur-sm transition-all duration-300 hover:bg-navy/70 hover:text-gold-light sm:right-8"
        aria-label="الشريحة التالية"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slide Indicators with Progress */}
      <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-10 bg-gold" 
                  : "w-1.5 bg-gold/40 hover:bg-gold/60"
              }`}
              aria-label={`انتقل إلى الشريحة ${index + 1}`}
            />
            {index === currentSlide && (
              <motion.div
                layoutId="slideProgress"
                className="absolute inset-0 h-1.5 rounded-full bg-gold-light/50"
                initial={false}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-gold/20 px-3 py-1 text-xs text-gold/60 backdrop-blur-sm"
        >
          متوقف مؤقتاً
        </motion.div>
      )}
    </section>
  );
}
