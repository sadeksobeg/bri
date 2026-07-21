"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductDTO } from "@/lib/types";
import { buildWhatsAppUrl, parseProductOptions } from "@/lib/whatsapp";

type Props = {
  product: ProductDTO;
  onClose: () => void;
};

export default function OrderModal({ product, onClose }: Props) {
  const optionGroups = useMemo(() => parseProductOptions(product.options), [product.options]);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const defaults: Record<string, string> = {};
    optionGroups.forEach((g) => {
      if (g.values[0]) defaults[g.name] = g.values[0];
    });
    setSelectedOptions(defaults);
  }, [optionGroups]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  const handleOrder = () => {
    const url = buildWhatsAppUrl({
      productName: product.name,
      price: product.price,
      quantity,
      selectedOptions,
      notes,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-navy/70 p-0 sm:items-center sm:p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9, rotateX: 10 }}
          animate={{ 
            opacity: isClosing ? 0 : 1, 
            y: isClosing ? 100 : 0, 
            scale: isClosing ? 0.9 : 1,
            rotateX: isClosing ? 10 : 0
          }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream shadow-2xl shadow-navy/20 sm:rounded-3xl"
        >
          {/* Header with Image */}
          <div className="relative h-56 w-full overflow-hidden sm:h-64">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0"
            >
              <Image
                src={product.image || "/brand/packaging.png"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="512px"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
            
            {/* Decorative top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy/60 text-cream backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-navy"
              aria-label="إغلاق"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Product Info Overlay */}
            <div className="absolute bottom-4 right-5 left-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs text-gold">{product.category}</span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-cream sm:text-3xl"
              >
                {product.name}
              </motion.h3>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-5 sm:p-6">
            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm leading-relaxed text-navy/65"
            >
              {product.description}
            </motion.p>

            {/* Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-5"
            >
              {optionGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + groupIndex * 0.1 }}
                >
                  <label className="mb-3 block text-sm font-medium text-navy">
                    <span className="flex items-center gap-2 border-r-2 border-gold/30 pr-3">
                      {group.name}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {group.values.map((value) => (
                      <motion.button
                        key={value}
                        type="button"
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                          selectedOptions[group.name] === value
                            ? "bg-gradient-to-r from-navy to-navy-light text-gold shadow-lg shadow-navy/20"
                            : "border border-navy/15 bg-white text-navy/70 hover:border-gold hover:text-gold-dark hover:shadow-md"
                        }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quantity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="mb-3 block text-sm font-medium text-navy">
                <span className="flex items-center gap-2 border-r-2 border-gold/30 pr-3">
                  الكمية
                </span>
              </label>
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity <= 1}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy/15 bg-white text-xl text-navy transition-all duration-300 hover:border-gold hover:text-gold-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                  </svg>
                </motion.button>
                <motion.span 
                  key={quantity}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="min-w-[3rem] text-center font-[family-name:var(--font-amiri)] text-2xl font-bold text-navy"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy/15 bg-white text-xl text-navy transition-all duration-300 hover:border-gold hover:text-gold-dark"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <label className="mb-3 block text-sm font-medium text-navy">
                <span className="flex items-center gap-2 border-r-2 border-gold/30 pr-3">
                  ملاحظات (اختياري)
                </span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="مثال: تغليف هدية، موعد التوصيل..."
                className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-all duration-300 focus:border-gold focus:shadow-lg focus:shadow-gold/10"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={handleOrder}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="relative h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </motion.div>
              <span className="relative">إرسال الطلب عبر واتساب</span>
              <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-6 text-xs text-navy/40"
            >
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                آمن ومضمون
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                توصيل سريع
              </span>
            </motion.div>
          </div>

          {/* Bottom decorative line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
