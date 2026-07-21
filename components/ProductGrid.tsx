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
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["الكل", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    if (selectedCategory === "الكل") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section id="products" className="relative overflow-hidden bg-cream-light py-16 sm:py-28">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top corner decoration */}
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gradient-radial-gold opacity-5 blur-3xl" />
        <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-gradient-radial-gold opacity-5 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(var(--color-navy) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-navy) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          {/* Decorative badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-xs text-gold backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            تشكيلتنا المميزة
          </motion.div>

          <h2 className="font-[family-name:var(--font-heading)] font-bold text-navy" style={{ fontSize: 'var(--text-h1)' }}>
            مجموعتنا <span className="text-gold-gradient">الفاخرة</span>
          </h2>

          {/* Ornamental divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-6 flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy/55"
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
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-navy to-navy-light text-gold shadow-lg shadow-navy/30"
                  : "border border-navy/10 bg-white text-navy/70 hover:border-gold hover:text-gold-dark hover:shadow-md hover:shadow-gold/10"
              }`}
            >
              {selectedCategory === cat && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-navy to-navy-light"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {selectedCategory === cat && (
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                )}
                {cat}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-3xl border border-dashed border-navy/20 bg-white/50 py-24 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-navy/5">
                <svg className="h-10 w-10 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-lg font-medium text-navy/50">لا توجد منتجات في هذا التصنيف</p>
              <p className="mt-2 text-sm text-navy/30">سيتم إضافة منتجات جديدة قريباً</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOrder={setOrderProduct}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            {/* Background glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-radial-gold opacity-20 blur-2xl" />
            
            <p className="relative mb-4 text-sm text-navy/50">
              هل تبحث عن شيء مميز؟
            </p>
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا مباشرة
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="url(#navy-gradient)"
            fillOpacity="0.03"
          />
          <defs>
            <linearGradient id="navy-gradient" x1="720" y1="0" x2="720" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0b1a3d"/>
              <stop offset="1" stopColor="#0b1a3d" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Order Modal */}
      {orderProduct && (
        <OrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
      )}
    </section>
  );
}
