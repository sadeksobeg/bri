"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
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
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] py-20 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8 xl:gap-24">
        
        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative mx-auto max-w-md">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/brand/packaging.png"
                alt="BRIVIA Premium Packaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Glow effect behind image */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/10 to-transparent blur-3xl -z-10" />

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-4 rounded-2xl border border-gold/20 bg-[#0f0f0f]/90 p-5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] lg:-bottom-8 lg:-right-8"
            >
              <div className="text-center">
                <p className="font-['Amiri'] text-3xl font-bold text-gold lg:text-4xl">+500</p>
                <p className="mt-1 text-xs text-white/50">عميل سعيد</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-1 flex flex-col justify-center text-center lg:text-right"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-xs tracking-[0.4em] text-gold/60">OUR STORY</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-['Amiri'] text-3xl font-bold text-white lg:text-4xl xl:text-5xl"
          >
            عن <span className="text-gold">بريڤيا</span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mb-8 h-[1px] w-20 bg-gradient-to-r from-gold/60 to-transparent lg:mx-0"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-10 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg"
          >
            بريڤيا ليست مجرد حلويات — إنها تجربة فخامة تُقدَّم في كل قطعة. 
            نختار أجود المكونات ونصمّم تغليفاً يليق بالمناسبات الخاصة، 
            لنقدّم لك حلويات حرفية تجمع بين الذوق الرفيع والأناقة.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 lg:max-w-lg"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-gold transition-all duration-300 group-hover:from-gold/30 group-hover:to-gold/10">
                  <FeatureIcon type={feature.icon} />
                </div>
                <div className="text-right">
                  <h4 className="font-semibold text-white/90">{feature.title}</h4>
                  <p className="text-xs text-white/40">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold to-gold/90 px-8 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(212,175,55,0.3)] transition-all duration-500 hover:shadow-[0_10px_60px_rgba(212,175,55,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                تصفح المنتجات
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-gold/50 hover:bg-gold/10"
            >
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
