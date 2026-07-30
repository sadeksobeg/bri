"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
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
  const isCake = product.category === "كيك";

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
      price: product.price ?? 0,
      quantity,
      selectedOptions,
      notes,
    });
    window.open(url, "_blank");
    handleClose();
  };

  // Get icon for cake size
  const getCakeIcon = (value: string) => {
    if (value.includes("4 أشخاص") || value.includes("12سم")) {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
        </svg>
      );
    }
    if (value.includes("6 أشخاص") || value.includes("16سم")) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
        </svg>
      );
    }
    if (value.includes("10 أشخاص") || value.includes("20سم")) {
      return (
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
        </svg>
      );
    }
    return (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0-16c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
      </svg>
    );
  };

  // Get icon for filling
  const getFillingIcon = (value: string) => {
    const icons: Record<string, ReactNode> = {
      "شوكولاتة": (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      "كراميل": (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      "مكسرات": (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      "فواكه": (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.843 12.28a8.5 8.5 0 00-13.686 0M12 6.5c1.5-3 3.5-4.5 5-4.5s3.5 1.5 5 4.5M12 6.5V12m0 0c-1.5 3-3.5 4.5-5 4.5s-3.5-1.5-5-4.5" />
        </svg>
      ),
      "صوص": (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    };
    return icons[value] || (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  };

  // Get icon for cream flavor
  const getCreamIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: isClosing ? 0 : 1, 
            y: isClosing ? 100 : 0, 
            scale: isClosing ? 0.95 : 1,
          }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[#1a1a1a] shadow-2xl sm:rounded-3xl"
        >
          {/* Header with Image */}
          <div className="relative h-56 w-full overflow-hidden sm:h-64">
            <Image
              src={product.image || "/brand/packaging.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="512px"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
            
            {/* Decorative top line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

            {/* Close Button */}
            <motion.button
              type="button"
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
              aria-label="إغلاق"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Product Info */}
            <div className="absolute bottom-4 right-5 left-5">
              <span className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
                {isCake && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M18 3h.01M21 3a2 2 0 00-2-2M3 3a2 2 0 00-2 2m15-3h-3m-3 0h-3m-3 0h-3m12 3a2 2 0 002 2M3 18a2 2 0 002 2M3 6v12a2 2 0 002 2" />
                  </svg>
                )}
                {product.category}
              </span>
              <h3 className="font-['Amiri'] text-2xl font-bold text-white sm:text-3xl">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5 p-5 sm:p-6">
            {/* Description */}
            {product.description && (
              <p className="text-sm leading-relaxed text-white/60">
                {product.description}
              </p>
            )}

            {/* Options - Beautiful Grid for Cakes */}
            {optionGroups.length > 0 && (
              <div className="space-y-6">
                {optionGroups.map((group) => (
                  <div key={group.name}>
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        {group.name === "المقاس" ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        ) : group.name === "الحشوة" ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        ) : (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                      </span>
                      {group.name}
                    </label>
                    
                    {isCake ? (
                      // Cake-specific beautiful grid
                      <div className="grid grid-cols-1 gap-2">
                        {group.values.map((value) => {
                          const isSelected = selectedOptions[group.name] === value;
                          return (
                            <motion.button
                              key={value}
                              type="button"
                              onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              className={`group flex items-center gap-4 rounded-xl border px-4 py-3 text-right transition-all ${
                                isSelected
                                  ? "border-amber-500 bg-amber-500/10 text-white"
                                  : "border-white/10 bg-white/5 text-white/70 hover:border-amber-500/30 hover:bg-amber-500/5"
                              }`}
                            >
                              {/* Icon */}
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSelected ? "bg-amber-500 text-black" : "bg-white/10 text-white/50 group-hover:bg-amber-500/20 group-hover:text-amber-400"
                              }`}>
                                {group.name === "المقاس" && getCakeIcon(value)}
                                {group.name === "الحشوة" && getFillingIcon(value)}
                                {group.name === "نكهة الكريمة" && getCreamIcon()}
                              </div>
                              
                              {/* Value */}
                              <span className={`flex-1 font-medium ${isSelected ? "text-white" : ""}`}>
                                {value}
                              </span>
                              
                              {/* Check */}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black"
                                >
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      // Regular options - chips style
                      <div className="flex flex-wrap gap-2">
                        {group.values.map((value) => (
                          <motion.button
                            key={value}
                            type="button"
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.name]: value }))}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                              selectedOptions[group.name] === value
                                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25"
                                : "border border-white/10 bg-white/5 text-white/70 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                            }`}
                          >
                            {value}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="mb-3 block text-sm font-medium text-white/80">
                الكمية
              </label>
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity <= 1}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 text-xl text-white transition-all hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                  </svg>
                </motion.button>
                <motion.span 
                  key={quantity}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="min-w-[3rem] text-center font-['Amiri'] text-2xl font-bold text-amber-400"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/10 bg-white/5 text-xl text-white transition-all hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                ملاحظات (اختياري)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="مثال: تغليف هدية، موعد التوصيل..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5"
              />
            </div>

            {/* CTA Button - WhatsApp */}
            <motion.button
              type="button"
              onClick={handleOrder}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-green-500/40"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>إرسال الطلب عبر واتساب</span>
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>

          {/* Bottom decorative line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
