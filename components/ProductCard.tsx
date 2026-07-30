"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductDTO } from "@/lib/types";

type Props = {
  product: ProductDTO;
  index: number;
  onOrder: (product: ProductDTO) => void;
  priority?: boolean;
};

export default function ProductCard({ product, index, onOrder, priority = false }: Props) {
  const hasImage = product.image && product.image !== "/products/placeholder.jpg";
  const isCake = product.category === "كيك";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-[#242424] to-[#1a1a1a] shadow-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Golden Border Glow on Hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl border border-amber-500/30" />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-amber-500/5 to-transparent" />
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-square">
          {hasImage ? (
            <div className="relative h-full w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={priority}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-60" />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-amber-900/20 to-transparent">
              <div className="rounded-full bg-amber-500/10 p-8">
                {isCake ? (
                  <svg className="h-16 w-16 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M18 3h.01M21 3a2 2 0 00-2-2M3 3a2 2 0 00-2 2m15-3h-3m-3 0h-3m-3 0h-3m12 3a2 2 0 002 2M3 18a2 2 0 002 2M3 6v12a2 2 0 002 2" />
                  </svg>
                ) : (
                  <svg className="h-16 w-16 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Badges - Top Left */}
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {product.isFeatured && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1.5 text-xs font-bold text-black shadow-lg"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              مميز
            </motion.span>
          )}
          {product.isBestSeller && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
            >
              الأكثر مبيعاً
            </motion.span>
          )}
          {product.isNew && (
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
            >
              جديد
            </motion.span>
          )}
        </div>

        {/* Cake Icon Badge */}
        {isCake && (
          <div className="absolute right-4 top-4 z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 backdrop-blur-sm shadow-lg">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M18 3h.01M21 3a2 2 0 00-2-2M3 3a2 2 0 00-2 2" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Category */}
        {product.category && (
          <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-500/80">
            {isCake && (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
            {product.category}
          </span>
        )}
        
        {/* Product Name */}
        <h3 className="mb-2 font-semibold text-xl leading-tight text-white transition-colors duration-300 group-hover:text-amber-400">
          {product.name}
        </h3>
        
        {/* Description */}
        {product.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/40">
            {product.description}
          </p>
        )}

        {/* Weight & Pieces */}
        {product.weight && (
          <div className="mb-4 flex items-center gap-3 text-sm text-white/30">
            <svg className="h-4 w-4 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span>{product.weight}</span>
            {product.pieces && <span>• {product.pieces} قطعة</span>}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button */}
        <motion.button
          type="button"
          onClick={() => onOrder(product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group/btn relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-6 py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/30 hover:bg-[position:100%_0]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            اطلب الآن
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </motion.button>
      </div>
    </motion.article>
  );
}
