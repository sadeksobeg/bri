"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#products", label: "المنتجات" },
    { href: "#about", label: "عن بريڤيا" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/90 backdrop-blur-2xl shadow-2xl shadow-navy/30"
            : "bg-transparent"
        }`}
      >
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        
        {/* Animated border glow on scroll */}
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />
        )}

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gold/50 shadow-gold-lg transition-all duration-300 group-hover:border-gold group-hover:shadow-gold-xl"
            >
              <Image
                src="/brand/logo.png"
                alt="BRIVIA"
                fill
                className="object-cover"
                sizes="56px"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
            
            <div className="hidden sm:block">
              <motion.span 
                whileHover={{ scale: 1.02 }}
                className="font-[family-name:var(--font-amiri)] text-2xl font-bold tracking-wider text-gold text-glow transition-transform"
              >
                BRIVIA
              </motion.span>
              <p className="text-[9px] tracking-[0.3em] text-gold/50 font-medium">PREMIUM CONFECTIONERY</p>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute -top-1 -right-1 h-3 w-3 border-t border-r border-gold/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-gold/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                whileHover={{ y: -2 }}
                className="group relative px-4 py-2 text-sm text-cream/80 transition-all duration-300 hover:text-gold"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            <motion.a
              href="#products"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline mr-4 text-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              اطلب الآن
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-gold/10 p-2 backdrop-blur-sm transition-all duration-300 md:hidden hover:bg-gold/20"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gold/20 bg-navy/98 backdrop-blur-2xl md:hidden"
            >
              <div className="px-4 py-6">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-4 py-3 text-cream/80 transition-all duration-300 hover:bg-gold/10 hover:text-gold"
                    >
                      <span className="h-1 w-1 rounded-full bg-gold/50 transition-all duration-300 group-hover:w-3 group-hover:bg-gold" />
                      {link.label}
                    </motion.a>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 rounded-2xl border border-gold/20 bg-gold/10 p-4"
                >
                  <p className="mb-3 text-center text-xs text-gold/60">اطلب الآن مباشرة</p>
                  <a
                    href="#products"
                    onClick={() => setMenuOpen(false)}
                    className="btn-gold w-full justify-center"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    تسوق الآن
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
