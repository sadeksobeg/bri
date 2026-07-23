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
    const timer = setInterval(nextSlide, 4000);
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

  // Split text animation
  const letters = "BRIVIA".split("");

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [-50, 50, -50],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-gold/25 via-gold/10 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [30, -30, 30],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-gold/20 via-gold/5 to-transparent blur-[80px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            y: [-30, 30, -30],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold/10 to-transparent blur-[60px]"
        />
      </div>

      {/* Subtle animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(212,175,55,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen">
        
        {/* LEFT SIDE: Stunning 3D Cube Slideshow */}
        <div 
          className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-[60%]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-[550px]">
            
            {/* Outer animated rings */}
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-[-25px] rounded-full border border-gold/10 border-dashed"
            />
            <motion.div
              animate={{ 
                rotate: -360,
              }}
              transition={{ 
                duration: 60, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-[-40px] rounded-full border border-gold/5"
            />
            
            {/* Main cube frame */}
            <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-navy/50 shadow-2xl shadow-gold/20 backdrop-blur-sm">
              
              {/* Inner glow border */}
              <div className="absolute inset-0 rounded-2xl border border-gold/20" />
              
              {/* 3D Cube Container */}
              <div 
                className="relative aspect-square w-full"
                style={{ perspective: 1200 }}
              >
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    initial={{ 
                      rotateY: direction > 0 ? 90 : -90,
                      opacity: 0,
                      scale: 0.85,
                      filter: "blur(10px)",
                    }}
                    animate={{ 
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{ 
                      rotateY: direction > 0 ? -90 : 90,
                      opacity: 0,
                      scale: 0.85,
                      filter: "blur(10px)",
                    }}
                    transition={{
                      rotateY: { duration: 1, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.6 },
                      filter: { duration: 0.5 },
                    }}
                    style={{ 
                      transformStyle: "preserve-3d",
                    }}
                    className="absolute inset-0"
                  >
                    {/* Image with multiple animation layers */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      {/* Ken Burns + subtle zoom */}
                      <motion.div
                        className="absolute inset-[-10%]"
                        animate={{ 
                          scale: [1.15, 1.25, 1.15],
                          rotate: [0, 3, 0, -3, 0],
                        }}
                        transition={{ 
                          duration: 12, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                      >
                        <Image
                          src={slides[currentSlide].src}
                          alt={`Slide ${currentSlide + 1}`}
                          fill
                          priority={currentSlide === 0}
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="object-cover"
                          quality={95}
                        />
                      </motion.div>

                      {/* Light reflection overlay */}
                      <motion.div
                        animate={{
                          x: ["-100%", "200%"],
                          opacity: [0, 0.15, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                      />

                      {/* Subtle vignette */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-black/20" />
                    </div>

                    {/* Floating particles on image */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-2 w-2 rounded-full bg-gold/60"
                        style={{
                          left: `${10 + i * 12}%`,
                          top: `${15 + (i % 4) * 20}%`,
                        }}
                        animate={{
                          y: [-30, 30, -30],
                          x: [15, -15, 15],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.4, 0.8],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Corner accents - animated */}
                <motion.div 
                  className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-gold/60"
                  animate={{ borderColor: ['rgba(212,175,55,0.6)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.6)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-gold/60"
                  animate={{ borderColor: ['rgba(212,175,55,0.6)', 'rgba(212,175,55,1)', 'rgba(212,175,55,0.6)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <div className="absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-gold/30" />
                <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-gold/30" />

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gold/20 p-4 text-gold backdrop-blur-md transition-all duration-300 hover:bg-gold/40 hover:scale-110 active:scale-95 border border-gold/30"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-gold/20 p-4 text-gold backdrop-blur-md transition-all duration-300 hover:bg-gold/40 hover:scale-110 active:scale-95 border border-gold/30"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Pause indicator */}
                <AnimatePresence>
                  {isPaused && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-gold/40 bg-navy/80 px-4 py-2 text-xs text-gold backdrop-blur-md"
                    >
                      ⏸ متوقف مؤقتاً
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Slide counter */}
                <div className="absolute bottom-4 right-4 z-10 rounded-full border border-gold/30 bg-navy/60 px-3 py-1 text-xs text-gold backdrop-blur-sm">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Slide Indicators - Elegant Pills */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                >
                  <motion.div
                    animate={{ width: index === currentSlide ? 40 : 12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-gradient-to-r from-gold to-gold-light shadow-lg shadow-gold/40" 
                        : "bg-gold/30 hover:bg-gold/50"
                    }`} 
                  />
                  {index === currentSlide && (
                    <motion.div
                      layoutId="cubeIndicator"
                      className="absolute inset-0 -z-10 rounded-full bg-gold/20 blur-md"
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Progress bar under indicators */}
            <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-gold/10">
              <motion.div
                key={currentSlide}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-gold to-gold-light"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Content - Clean & Minimal */}
        <div className="hidden w-[40%] items-center lg:flex">
          <div className="relative w-full max-w-md px-8">
            
            {/* Decorative vertical lines */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -left-16 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-gold/40 to-transparent"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute -left-20 top-1/4 h-px w-10 origin-left bg-gradient-to-r from-gold/30 to-transparent"
            />

            {/* Animated Brand Name with Split Letters */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex"
              >
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100, rotateX: -90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ 
                      delay: 0.3 + i * 0.08, 
                      duration: 0.6,
                      ease: [0.2, 0.65, 0.35, 0.9]
                    }}
                    className="text-glow font-[family-name:var(--font-heading)] text-7xl font-bold tracking-[0.3em] text-gold xl:text-8xl"
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Elegant Divider with Icon */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="my-8 flex items-center gap-4"
            >
              <motion.div 
                className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.svg 
                className="h-8 w-8 text-gold" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </motion.svg>
              <motion.div 
                className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="space-y-3"
            >
              <p className="font-[family-name:var(--font-heading)] text-3xl text-cream/90 xl:text-4xl">
                فخامة في كل قطعة
              </p>
              <motion.p 
                className="text-[11px] tracking-[0.7em] text-gold/60 xl:text-xs"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PREMIUM CONFECTIONERY
              </motion.p>
            </motion.div>

            {/* Description - minimal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="mt-6 max-w-sm text-sm leading-relaxed text-cream/50"
            >
              حيث تلتقي الحرفية بالفخامة، نقدم لك تجربة حلوى لا تُنسى
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-10 flex flex-wrap gap-5"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212,175,55,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold/80 px-10 py-5 text-sm font-medium text-navy shadow-lg shadow-gold/30 transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
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
                className="group rounded-full border-2 border-gold/50 px-10 py-5 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                <span className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل معنا
                </span>
              </motion.a>
            </motion.div>

            {/* Features row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-3 text-xs text-cream/40"
            >
              {[
                { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", label: "تغليف فاخر" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "جودة حرفية" },
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "توصيل سريع" },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  {item.label}
                </span>
              ))}
            </motion.div>

            {/* Decorative bottom element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="mt-16"
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/20" />
                <svg className="h-5 w-5 text-gold/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 lg:hidden">
          <div className="bg-gradient-to-t from-navy via-navy/95 to-transparent p-6 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-glow font-[family-name:var(--font-heading)] text-5xl font-bold tracking-[0.2em] text-gold">
                BRIVIA
              </h1>
              <p className="mt-3 font-[family-name:var(--font-heading)] text-xl text-cream/90">
                فخامة في كل قطعة
              </p>
              <p className="text-[10px] tracking-[0.5em] text-gold/60">
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
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/30 max-lg:hidden"
      >
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }
      `}</style>
    </section>
  );
}
