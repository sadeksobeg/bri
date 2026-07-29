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
    { href: "https://wa.me/963995939432", label: "تواصل معنا", external: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-navy/95 backdrop-blur-2xl shadow-xl shadow-navy/20"
            : "bg-transparent"
        }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/50 shadow-md sm:h-12 sm:w-12">
              <Image
                src="/brand/logo.png"
                alt="BRIVIA"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <span className="font-['Amiri'] text-xl font-bold tracking-wider text-gold sm:text-2xl">
              BRIVIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-cream/80 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#products"
              className="rounded-full bg-gradient-to-r from-gold to-gold/90 px-5 py-2.5 text-sm font-medium text-navy shadow-md transition-all hover:shadow-lg hover:shadow-gold/30"
            >
              اطلب الآن
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-gold/10 p-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="القائمة"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-[2px] w-5 rounded-full bg-gold"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gold/20 bg-navy/98 backdrop-blur-2xl md:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center rounded-lg px-4 py-3 text-cream/80 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#products"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold/90 py-3 text-sm font-medium text-navy"
                >
                  اطلب الآن
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
}
