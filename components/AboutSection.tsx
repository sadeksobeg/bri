"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const features = [
    { icon: "quality", title: "جودة حرفية", desc: "نختار أجود المكونات العالمية" },
    { icon: "gift", title: "تغليف فاخر", desc: "تصاميم تليق بأجمل المناسبات" },
    { icon: "diamond", title: "فخامة", desc: "تجربة حلوى لا تُنسى" },
    { icon: "handshake", title: "خدمة مميزة", desc: "توصيل سريع وآمن" },
  ];

  const FeatureIcon = ({ type }: { type: string }) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case "quality":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        );
      case "gift":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        );
      case "diamond":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "handshake":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        );
    }
  };

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-navy py-16 sm:py-28">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Damask pattern */}
        <div className="absolute inset-0 pattern-damask opacity-20" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-darker via-transparent to-navy-darker" />
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-10" />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold/30"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Decorative rings */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full border border-gold/5" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-80 w-80 rounded-full border border-gold/5" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Image Column with Parallax */}
        <motion.div
          style={{ y: imageY }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto max-w-md">
            {/* Glow behind image */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl bg-gradient-radial-gold blur-3xl"
            />

            {/* Main image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square overflow-hidden rounded-3xl border-2 border-gold/30 shadow-gold-xl transition-all duration-500"
            >
              <Image
                src="/brand/packaging.png"
                alt="تغليف BRIVIA الفاخر"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              animate={{ y: [0, -8, 0] }}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-gold/30 bg-navy/90 p-5 shadow-gold-lg backdrop-blur-xl sm:-bottom-8 sm:-left-8"
            >
              <div className="text-center">
                <p className="font-[family-name:var(--font-amiri)] text-3xl font-bold text-gold">+500</p>
                <p className="mt-1 text-xs text-cream/60">عميل سعيد</p>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              animate={{ y: [0, 8, 0] }}
              className="absolute -right-4 top-1/4 rounded-2xl border border-gold/20 bg-navy/80 p-3 backdrop-blur-xl sm:-right-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
                  <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gold">4.9</p>
                  <p className="text-[10px] text-cream/50">تقييم</p>
                </div>
              </div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute -top-2 -right-2 h-8 w-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
            <div className="absolute -bottom-2 -left-2 h-8 w-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
          </div>
        </motion.div>

        {/* Content Column with Parallax */}
        <motion.div
          style={{ y: contentY }}
          className="order-1 text-center lg:text-right"
        >
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-xs text-gold backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              قصتنا
            </motion.div>

            <h2 className="font-[family-name:var(--font-heading)] font-bold text-gold" style={{ fontSize: 'var(--text-h1)' }}>
              عن <span className="text-gold-light">بريڤيا</span>
            </h2>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-4 h-0.5 w-20 bg-gradient-to-r from-gold to-transparent lg:mx-0 lg:mr-0"
            />

            <p className="mt-8 text-base leading-loose text-cream/70 sm:text-lg lg:max-w-lg lg:text-right">
              بريڤيا ليست مجرد حلويات — إنها تجربة فخامة تُقدَّم في كل قطعة. 
              نختار أجود المكونات ونصمّم تغليفاً يليق بالمناسبات الخاصة، 
              لنقدّم لك حلويات حرفية تجمع بين الذوق الرفيع والأناقة.
            </p>

            {/* Features Grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:max-w-lg lg:text-right">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="group flex items-center gap-3 rounded-2xl border border-gold/10 bg-gold/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-gold/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110">
                    <FeatureIcon type={feature.icon} />
                  </div>
                  <div className="text-right">
                    <h4 className="font-[family-name:var(--font-amiri)] text-base font-bold text-gold">{feature.title}</h4>
                    <p className="text-xs text-cream/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <a
                href="#products"
                className="btn-gold"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                تصفح المنتجات
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
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 70V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
            fill="url(#cream-gradient-about)"
          />
          <defs>
            <linearGradient id="cream-gradient-about" x1="720" y1="0" x2="720" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f7f3ec"/>
              <stop offset="1" stopColor="#f7f3ec" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
