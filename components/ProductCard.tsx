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
      }}
      className="group"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cream-dark to-cream">
          {hasImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3ClpaRW8UUVrFEsYCqqxgAAcgAD1VVd6xpVpO8E+o20UqHDI0oBB+RWLV6xqU+pXVxPeSySu5LMXOST5JqhXoJHa3kFzGJLeVJIzyGRgwP8jVVUezv7i1mEtrPLE4G2aNipI8ZBBoq1ei7O9vLWUS208kTj7o2IPv5B4NUtN1q81LT4bi6ZWlbOSoAH+0VWvWTU/wD/2Q=="
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-4 text-center">
              <div className="mb-3 rounded-full bg-gold/20 p-4">
                <svg className="h-10 w-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy">{product.name}</h4>
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy shadow-lg">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                مميز
              </span>
            )}
            {product.isBestSeller && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                الأكثر مبيعاً
              </span>
            )}
            {product.isNew && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                جديد
              </span>
            )}
          </div>

          {/* Category Badge */}
          {product.category && (
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
                {product.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="mb-1 font-semibold leading-tight text-navy line-clamp-1">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-navy/60">
              {product.description}
            </p>
          )}

          {/* Weight & Pieces */}
          {product.weight && (
            <div className="mb-3 flex items-center gap-2 text-xs text-navy/50">
              <svg className="h-4 w-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              <span>{product.weight}</span>
              {product.pieces && <span>• {product.pieces} قطعة</span>}
            </div>
          )}

          {/* Price & Order */}
          <div className="flex items-center justify-between pt-2">
            {product.price > 0 && (
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-navy">
                  {product.price.toLocaleString('ar-SY')}
                </span>
                <span className="text-xs text-navy/50">ل.س</span>
              </div>
            )}
            
            <motion.button
              type="button"
              onClick={() => onOrder(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light px-4 py-2 text-sm font-medium text-gold transition-all hover:shadow-lg hover:shadow-navy/30"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              اطلب
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
