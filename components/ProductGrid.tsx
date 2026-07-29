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
    <>
      <section id="products" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-amber-600">
              تشكيلتنا المميزة
            </span>
            <h2 className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
              منتجاتنا الفاخرة
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-500">
              اكتشف مجموعتنا المميزة من الحلويات الفاخرة، المصنوعة بأجود المكونات
            </p>
          </motion.div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-10 flex flex-wrap items-center justify-center gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-white shadow-md"
                      : "bg-white text-gray-600 shadow-sm hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-500">قريباً...</p>
                <p className="mt-2 text-sm text-gray-400">نعمل على إضافة منتجات جديدة</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
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

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="mb-4 text-sm text-gray-500">
              لم تجد ما تبحث عنه؟
            </p>
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا مباشرة
            </a>
          </motion.div>
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
