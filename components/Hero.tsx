"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    src: "/showcase/slide1.png",
    alt: "حلويات فاخرة",
  },
  {
    src: "/showcase/slide2.png",
    alt: "شوكولاتة مميزة",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
        
        {/* Gold Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-[0.03]" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-12 bg-gold"
                : "w-1.5 bg-gold/30 hover:bg-gold/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo */}
          <motion.div variants={itemVariants} className="relative mb-12">
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44 overflow-hidden rounded-full border-[2px] border-gold/40 shadow-[0_0_60px_-15px_rgba(201,169,97,0.3)]"
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
            className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-[0.15em] text-gold sm:text-6xl lg:text-7xl"
            style={{ textShadow: '0 0 40px rgba(201, 169, 97, 0.2)' }}
          >
            BRIVIA
          </motion.h1>

          {/* Elegant divider */}
          <motion.div
            variants={itemVariants}
            className="my-8 flex items-center justify-center gap-6"
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
            className="font-[family-name:var(--font-amiri)] text-xl tracking-[0.3em] text-cream/60 sm:text-2xl"
          >
            حلويات فاخرة
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-1 text-xs tracking-[0.6em] text-gold/40 sm:text-sm"
          >
            PREMIUM CONFECTIONERY
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-12 max-w-xl mx-auto text-base leading-relaxed text-cream/50 sm:text-lg"
          >
            تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة، صُممت لتُبهج الحواس في كل قضمة
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-col justify-center gap-4 sm:flex-row"
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

          {/* Feature pills */}
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
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gold/40"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
