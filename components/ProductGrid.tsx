"use client";

import { useMemo, useState } from "react";
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
    <section id="products" className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-16 sm:py-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br from-gold/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tl from-gold/10 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs text-gold backdrop-blur-sm"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            تشكيلتنا المميزة
          </motion.div>

          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
            مجموعتنا <span className="text-gold">الفاخرة</span>
          </h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-navy/60"
          >
            اختر من تشكيلة مختارة بعناية — ثم اطلب مباشرة عبر واتساب في ثوانٍ
          </motion.p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-navy to-navy-light text-gold shadow-lg shadow-navy/30"
                  : "bg-white text-navy border border-gold/20 hover:border-gold hover:shadow-md hover:shadow-gold/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl border border-dashed border-navy/20 bg-white/50 py-20 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy/5">
                <svg className="h-8 w-8 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-lg font-medium text-navy/50">لا توجد منتجات</p>
              <p className="mt-2 text-sm text-navy/30">سيتم إضافة منتجات جديدة قريباً</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-sm text-navy/50">
            هل تبحث عن شيء مميز؟
          </p>
          <a
            href="https://wa.me/963995939432"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            تواصل معنا مباشرة
          </a>
        </motion.div>
      </div>
    </section>
  );
}
