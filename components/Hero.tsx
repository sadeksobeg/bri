"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  { src: "/showcase/slide1.png", alt: "حلويات فاخرة" },
  { src: "/showcase/slide2.png", alt: "شوكولاتة مميزة" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-10 bg-gold" : "w-1.5 bg-gold/40"
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          {/* Logo */}
          <div className="mx-auto mb-10 h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-2 border-gold/30 shadow-lg">
            <Image
              src="/brand/logo.png"
              alt="BRIVIA Logo"
              fill
              className="object-cover"
              sizes="160px"
              priority
            />
          </div>

          {/* Brand Name */}
          <h1 className="font-heading text-5xl font-bold tracking-[0.2em] text-gold sm:text-6xl lg:text-7xl">
            BRIVIA
          </h1>

          {/* Divider */}
          <div className="my-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gold/40" />
            <svg className="h-4 w-4 text-gold/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-12 bg-gold/40" />
          </div>

          {/* Tagline */}
          <p className="font-amiri text-2xl text-cream/70 sm:text-3xl">
            حلويات فاخرة
          </p>
          <p className="mt-1 text-xs tracking-[0.5em] text-gold/50 sm:text-sm">
            PREMIUM CONFECTIONERY
          </p>

          {/* Description */}
          <p className="mt-10 mx-auto max-w-xl text-base text-cream/50 sm:text-lg">
            تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#products" className="btn-gold">
              استكشف المجموعة
            </a>
            <a href="https://wa.me/963995939432" target="_blank" rel="noopener noreferrer" className="btn-outline">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا
            </a>
          </div>

          {/* Feature pills */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 text-xs text-cream/40">
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/40 animate-bounce">
        <span className="text-xs tracking-widest">SCROLL</span>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
