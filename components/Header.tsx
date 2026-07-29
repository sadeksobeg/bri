"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#products", label: "المنتجات" },
    { href: "#about", label: "عن بريڤيا" },
    { href: "https://wa.me/963995939432", label: "تواصل معنا", external: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/90 backdrop-blur-2xl shadow-[0_10px_60px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        {/* Top accent line */}
        <div className={`h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/50 shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] lg:h-14 lg:w-14"
            >
              <Image
                src="/brand/logo.png"
                alt="بريڤيا"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
            
            <div>
              <span className="font-['Amiri'] text-xl font-bold tracking-[0.15em] text-gold transition-all lg:text-2xl">
                بريڤيا
              </span>
              <p className="hidden text-[8px] tracking-[0.3em] text-gold/50 lg:block lg:text-[9px]">
                حلويات فاخرة
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group relative text-sm font-medium text-white/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-gold to-gold/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold to-gold/90 px-6 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all duration-500 hover:shadow-[0_10px_50px_rgba(212,175,55,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                اطلب الآن
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-white/5 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-1 px-4 py-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-4 py-4 text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-gold"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/50 transition-all duration-300 group-hover:w-3 group-hover:bg-gold" />
                    {link.label}
                  </motion.a>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <a
                    href="#products"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold/90 py-4 text-sm font-semibold text-black shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    اطلب الآن
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
