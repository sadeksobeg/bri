"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductDTO } from "@/lib/types";

type Props = {
  product: ProductDTO;
  index: number;
  onOrder: (product: ProductDTO) => void;
};

export default function ProductCard({ product, index, onOrder }: Props) {
  const isTall = index % 3 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: (index % 6) * 0.08,
      }}
      className={`group relative ${isTall ? "md:row-span-2" : ""}`}
    >
      <div className="relative h-full overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:shadow-float">
        {/* Image Section */}
        <div className={`relative overflow-hidden bg-gradient-to-br from-cream-dark to-cream ${
          isTall ? "aspect-[3/4] md:aspect-auto md:h-full md:min-h-[400px]" : "aspect-square"
        }`}>
          <Image
            src={product.image || "/brand/packaging.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="badge-premium backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            <button
              type="button"
              onClick={() => onOrder(product)}
              className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-navy shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-navy"
            >
              اطلب الآن
            </button>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative z-10 p-5">
          <div className="space-y-3">
            {/* Product Name */}
            <h3 className="font-semibold leading-tight text-navy" style={{ fontSize: 'var(--text-h3)' }}>
              {product.name}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-relaxed text-navy/60">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-gold">
                {product.price.toLocaleString()} ل.س
              </span>
              <button
                type="button"
                onClick={() => onOrder(product)}
                className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-navy"
              >
                اطلب
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
