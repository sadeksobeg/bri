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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: Math.min(index * 0.1, 0.5),
      }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] backdrop-blur-sm transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.12]">
        
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {hasImage ? (
            <>
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={priority}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3ClpaRW8UUVrFEsYCqqxgAAcgAD1VVd6xpVpO8E+o20UqHDI0oBB+RWLV6xqU+pXVxPeSySu5LMXOST5JqhXoJHa3kFzGJLeVJIzyGRgwP8jVVUezv7i1mEtrPLE4G2aNipI8ZBBoq1ei7O9vLWUS208kTj7o2IPv5B4NUtN1q81LT4bi6ZWlbOSoAH+0VWvWTU/wD/2Q=="
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-gold/10 to-transparent">
              <div className="rounded-full bg-gold/20 p-6">
                <svg className="h-12 w-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="mt-4 font-semibold text-white/80">{product.name}</h4>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.isFeatured && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold to-gold/80 px-3 py-1.5 text-xs font-bold text-black shadow-lg"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                مميز
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
              >
                الأكثر مبيعاً
              </motion.span>
            )}
            {product.isNew && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg"
              >
                جديد
              </motion.span>
            )}
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-4 left-4">
              <span className="rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/10">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative p-5">
          {/* Product Name */}
          <h3 className="mb-2 font-semibold leading-tight text-white line-clamp-1 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          
          {/* Description */}
          {product.description && (
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
              {product.description}
            </p>
          )}

          {/* Weight & Pieces */}
          {product.weight && (
            <div className="mb-4 flex items-center gap-3 text-sm text-white/40">
              <svg className="h-4 w-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>{product.weight}</span>
              {product.pieces && <span>• {product.pieces} قطعة</span>}
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            {product.price > 0 && (
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-gold">
                  {product.price.toLocaleString('ar-SY')}
                </span>
                <span className="text-xs text-white/40">ل.س</span>
              </div>
            )}
            
            <motion.button
              type="button"
              onClick={() => onOrder(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold/90 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              اطلب الآن
            </motion.button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent" />
        </div>
      </div>
    </motion.article>
  );
}
