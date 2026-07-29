"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#products", label: "المنتجات" },
    { href: "#about", label: "عن BRIvIA" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute -bottom-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center md:items-start md:text-right"
          >
            {/* Logo */}
            <div className="group relative mb-6">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-500/40 shadow-[0_0_30px_rgba(251,191,36,0.2)] transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_50px_rgba(251,191,36,0.3)]">
                <Image 
                  src="/brand/logo.png" 
                  alt="BRIvIA" 
                  fill 
                  className="object-cover" 
                  sizes="80px"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <h3 className="font-['Amiri'] text-3xl font-bold tracking-widest text-white">
              BRI<span className="text-amber-400">v</span>IA
            </h3>
            <p className="mt-1 text-[10px] tracking-[0.3em] text-amber-400/50">PREMIUM CONFECTIONERY</p>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              حلويات فاخرة بحرفية عالية — نكهات استثنائية وتغليف يليق بكل مناسبة
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <motion.a
                href="https://wa.me/963995939432"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-green-400 transition-all duration-300 hover:border-green-500 hover:bg-green-500 hover:text-white"
                aria-label="واتساب"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="mb-6 font-['Amiri'] text-xl font-bold text-amber-400">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 transition-all duration-300 hover:text-amber-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-amber-500/50 transition-all duration-300 group-hover:w-3 group-hover:bg-amber-400" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="mb-6 font-['Amiri'] text-xl font-bold text-amber-400">
              تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/963995939432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">واتساب</p>
                    <p className="text-sm font-semibold text-amber-400">0963 995 939 432</p>
                  </div>
                </a>
              </li>
              <li className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">الموقع</p>
                    <p className="text-sm text-white/70">سوريا</p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-12 h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-between gap-4 text-center md:flex-row"
        >
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>© {currentYear}</span>
            <span className="text-amber-400/60">BRIvIA</span>
            <span>—</span>
            <span>جميع الحقوق محفوظة</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>جودة فاخرة منذ 2024</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative top corners */}
      <div className="pointer-events-none absolute top-0 left-0 h-32 w-32">
        <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-amber-500/20 rounded-tl-2xl" />
        <div className="absolute top-6 left-6 h-12 w-12 border-t border-l border-amber-500/10 rounded-tl-xl" />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32">
        <div className="absolute top-0 right-0 h-16 w-16 border-t-2 border-r-2 border-amber-500/20 rounded-tr-2xl" />
        <div className="absolute top-6 right-6 h-12 w-12 border-t border-r border-amber-500/10 rounded-tr-xl" />
      </div>
    </footer>
  );
}
