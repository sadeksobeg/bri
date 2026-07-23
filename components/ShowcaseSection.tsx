"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const showcaseImages = [
  {
    src: "/showcase/dessert-table.jpg",
    alt: "طاولة حلويات فاخرة",
    title: "حلويات مميزة",
    description: "كيك وشوكولاتة طازجة",
  },
  {
    src: "/showcase/chocolate-bar.jpg",
    alt: "شوكولاتة فاخرة",
    title: "شوكولاتة حرفية",
    description: "صُنعت بعناية فائقة",
  },
  {
    src: "/showcase/truffles.jpg",
    alt: "ترفيل فاخر",
    title: "ترفيل مميز",
    description: "نكهات استثنائية",
  },
];

export default function ShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-4 inline-block text-gold"
          >
            <svg className="mx-auto h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </motion.span>
          
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-wide text-gold sm:text-4xl lg:text-5xl">
            لمسة من <span className="text-gold-gradient">الفخامة</span>
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/50" />
            <div className="h-2 w-2 rotate-45 bg-gold/50" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/60"
          >
            كل قطعة حلوى هي تحفة فنية مصنوعة بعناية وحب
          </motion.p>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-navy-light/50 p-2 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_60px_-15px_rgba(201,169,97,0.3)]">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-navy/50">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
                  
                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 -translate-x-full translate-y-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full group-hover:translate-y-0" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Decorative Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="mb-3 h-px w-12 bg-gradient-to-r from-gold to-transparent"
                  />
                  
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-gold sm:text-2xl">
                    {image.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream/60">
                    {image.description}
                  </p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-gold/40 rounded-tl-lg" />
                <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-gold/40 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-gold/40 rounded-bl-lg" />
                <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-gold/40 rounded-br-lg" />
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-radial-gold opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="text-gold/40">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>
      </div>
    </section>
  );
}
