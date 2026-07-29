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

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image Section - Clean, no text overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {hasImage ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="rounded-full bg-amber-100 p-6">
              <svg className="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="mt-4 font-semibold text-gray-700">{product.name}</h4>
          </div>
        )}

        {/* Badges - Outside image area */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-black shadow-sm">
              ⭐ مميز
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              الأكثر مبيعاً
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              جديد
            </span>
          )}
        </div>
      </div>

      {/* Content Section - Clean card below image */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        {product.category && (
          <span className="mb-2 text-xs font-medium uppercase tracking-wider text-amber-600">
            {product.category}
          </span>
        )}
        
        {/* Product Name */}
        <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        {product.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {product.description}
          </p>
        )}

        {/* Weight & Pieces */}
        {product.weight && (
          <div className="mb-4 flex items-center gap-3 text-sm text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span>{product.weight}</span>
            {product.pieces && <span>• {product.pieces} قطعة</span>}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Button - Full Width, Clean */}
        <button
          type="button"
          onClick={() => onOrder(product)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-md active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          اطلب الآن
        </button>
      </div>
    </motion.article>
  );
}
