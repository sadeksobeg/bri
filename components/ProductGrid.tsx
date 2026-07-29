"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import OrderModal from "./OrderModal";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductDTO } from "@/lib/types";

type Props = {
  products: ProductDTO[];
};

const INITIAL_SHOW = 6;

export default function ProductGrid({ products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [orderProduct, setOrderProduct] = useState<ProductDTO | null>(null);
  const [showCount, setShowCount] = useState(INITIAL_SHOW);

  const categories = ["الكل", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const filtered = selectedCategory === "الكل" 
    ? products 
    : products.filter((p) => p.category === selectedCategory);

  const visibleProducts = filtered.slice(0, showCount);
  const hasMore = filtered.length > showCount;

  const handleShowMore = () => {
    setShowCount((prev) => prev + INITIAL_SHOW);
  };

  return (
    <>
      <section id="products" className="relative overflow-hidden bg-[#1a1a1a] py-24 sm:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#d4af37" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-amber-500/10 to-transparent blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-amber-500/80">
                Our Collection
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-light text-4xl tracking-wide text-white sm:text-5xl lg:text-6xl"
            >
              تشكيلتنا{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text font-semibold text-transparent">
                الفاخرة
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-xl text-base text-white/50"
            >
              كل قطعة تحكي قصة فخامة، مصنوعة بعناية فائقة من أجود المكونات
            </motion.p>
          </motion.div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-12 flex flex-wrap items-center justify-center gap-3"
            >
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCount(INITIAL_SHOW);
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_8px_30px_rgba(251,191,36,0.3)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    layout: { duration: 0.3 }
                  }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                    onOrder={setOrderProduct}
                    priority={index < 3}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Show More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <button
                type="button"
                onClick={handleShowMore}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-amber-500/30 bg-transparent px-10 py-4 text-sm font-medium text-amber-400 transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/10"
              >
                <span className="relative z-10">
                  عرض المزيد ({filtered.length - showCount} منتج متبقي)
                </span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-white/10 bg-white/5 py-24 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
                <svg className="h-10 w-10 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-xl font-light text-white/60">قريباً...</p>
              <p className="mt-2 text-sm text-white/30">نعمل على إضافة منتجات جديدة</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Order Modal */}
      <AnimatePresence>
        {orderProduct && (
          <OrderModal
            product={orderProduct}
            onClose={() => setOrderProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
