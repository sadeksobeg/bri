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
        duration: 0.5, 
        delay: (index % 6) * 0.08,
      }}
      className="group"
    >
      <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:shadow-float">
        {/* Image Section - Uniform Size */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-cream-dark via-cream to-gold/20">
          {hasImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMRNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3ClpaRW8UUVrFEsYCqqxgAAcgAD1VVd6xpVpO8E+o20UqHDI0oBB+RWLV6xqU+pXVxPeSySu5LMXOST5JqhXoJHa3kFzGJLeVJIzyGRgwP8jVVUezv7i1mEtrPLE4G2aNipI8ZBBoq1ei7O9vLWUS208kTj7o2IPv5B4NUtN1q81LT4bi6ZWlbOSoAH+0VWvWTU/wD/2Q=="
            />
          ) : (
            /* Beautiful Placeholder */
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-gold/20 p-5">
                <svg className="h-12 w-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-navy">{product.name}</h4>
              <p className="mt-1 text-xs text-navy/50">{product.category}</p>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-block rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          {/* Badges */}
          {(product.isFeatured || product.isBestSeller || product.isNew) && (
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  مميز
                </span>
              )}
              {product.isBestSeller && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  الأكثر مبيعاً
                </span>
              )}
              {product.isNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  جديد
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="space-y-3">
            {/* Product Name */}
            <h3 className="font-semibold leading-tight text-navy line-clamp-1" style={{ fontSize: 'var(--text-lg)' }}>
              {product.name}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-relaxed text-navy/60">
              {product.description}
            </p>

            {/* Weight & Pieces */}
            {product.weight && (
              <div className="flex items-center gap-2 text-xs text-navy/50">
                <span>{product.weight}</span>
                {product.pieces && <span>•</span>}
                {product.pieces && <span>{product.pieces} قطعة</span>}
              </div>
            )}

            {/* Order Button */}
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={() => onOrder(product)}
                className="w-full rounded-xl bg-navy py-3 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
              >
                اطلب الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
