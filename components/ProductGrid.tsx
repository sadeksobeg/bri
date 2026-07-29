"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductDTO } from "@/lib/types";

type Props = {
  products: ProductDTO[];
};

export default function ProductGrid({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [orderProduct, setOrderProduct] = useState<ProductDTO | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["الكل", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCategory === "الكل") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section id="products" className="relative overflow-hidden bg-[#0f0f0f] py-20 lg:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/5 to-transparent blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-gold/5 to-transparent blur-[100px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:mb-20"
        >
          {/* Premium Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-xs tracking-[0.4em] text-gold/60">OUR COLLECTION</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-['Amiri'] text-4xl font-bold text-white lg:text-5xl xl:text-6xl"
          >
            <span className="text-gold">تشكيلتنا</span>
            <span className="text-white"> الفاخرة</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-base leading-relaxed text-white/50 lg:text-lg"
          >
            كل قطعة مصنوعة بعناية فائقة من أجود المكونات، لتقدم لك تجربة ذوق لا تُنسى
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-8 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>
        </motion.div>

        {/* Category Filters - Premium Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3 lg:mb-16"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-gold via-gold to-gold/90 text-black shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
                  : "bg-white/5 text-white/70 backdrop-blur-sm hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid - Premium Layout */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-white/10 bg-white/5 py-24 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-10 w-10 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-xl font-medium text-white/50">قريباً...</p>
              <p className="mt-2 text-sm text-white/30">نعمل على إضافة منتجات جديدة</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOrder={setOrderProduct}
                  priority={index < 6}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center lg:mt-24"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 blur-3xl" />
            
            <p className="relative mb-6 text-sm text-white/40">
              لم تجد ما تبحث عنه؟
            </p>
            
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-10 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-500 hover:shadow-[0_20px_60px_rgba(34,197,94,0.4)] hover:-translate-y-1"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا مباشرة
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
