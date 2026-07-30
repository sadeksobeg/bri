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
    { href: "#about", label: "عن BRIvIA" },
    { href: "https://wa.me/963995939432", label: "واتساب", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] lg:h-14 lg:w-14"
            >
              <Image
                src="/brand/logo.png"
                alt="BRIvIA"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className="font-['Amiri'] text-xl font-bold tracking-widest text-white transition-colors lg:text-2xl">
                BRI<span className="text-amber-400">v</span>IA
              </span>
              <p className="text-[6px] tracking-[0.3em] text-amber-400/60 lg:text-[7px]">
                PREMIUM CONFECTIONERY
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
                className="group relative text-sm font-medium text-white/60 transition-colors duration-300 hover:text-amber-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-6 py-2.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(251,191,36,0.3)] transition-all duration-500 hover:shadow-[0_10px_50px_rgba(251,191,36,0.5)] hover:bg-[position:100%_0]"
            >
              <span className="relative z-10 flex items-center gap-2">
                اطلب الآن
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-amber-400"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-amber-400"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-amber-400"
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
              className="overflow-hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden"
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
                    className="group flex items-center gap-3 rounded-xl px-4 py-4 text-white/70 transition-all duration-300 hover:bg-white/5 hover:text-amber-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-amber-500/50 transition-all duration-300 group-hover:w-3 group-hover:bg-amber-400" />
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
                    href="https://wa.me/963995939432"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 py-4 text-sm font-semibold text-black shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    اطلب الآن
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
