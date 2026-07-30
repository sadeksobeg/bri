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
  const isCake = product.category === "كيك";

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const defaults: Record<string, string> = {};
    optionGroups.forEach((g) => {
      if (g.type !== "input" && g.values[0]) {
        defaults[g.name] = g.values[0];
      }
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
    const allOptions: Record<string, string> = {};
    
    optionGroups.forEach((g) => {
      if (g.type === "input") {
        if (inputValues[g.name]) {
          allOptions[g.name] = inputValues[g.name];
        }
      } else if (selectedOptions[g.name]) {
        allOptions[g.name] = selectedOptions[g.name];
      }
    });

    const url = buildWhatsAppUrl({
      productName: product.name,
      price: product.price ?? 0,
      quantity: 1,
      selectedOptions: allOptions,
      notes,
    });
    window.open(url, "_blank");
    handleClose();
  };

  const getCakeIcon = (value: string) => {
    const size = value.toLowerCase();
    if (size.includes("4 أشخاص") || size.includes("12") || size.includes("صغير")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v2m0 8v2m-3-5h6"/></svg>;
    }
    if (size.includes("6 أشخاص") || size.includes("16") || size.includes("متوسط")) {
      return <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>;
    }
    if (size.includes("10 أشخاص") || size.includes("20") || size.includes("كبير")) {
      return <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="3"/></svg>;
    }
    return <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>;
  };

  const getFillingIcon = (value: string) => {
    const filling = value.toLowerCase();
    if (filling.includes("شوكولاتة") || filling.includes("شوكو")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="6" width="18" height="12" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M9 6v12M15 6v12"/></svg>;
    }
    if (filling.includes("كراميل")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>;
    }
    if (filling.includes("مكسرات") || filling.includes("لوز") || filling.includes("جوز")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 .5-4 1.5C7 5.5 6.5 7 6.5 8.5c0 3 2 5.5 4.5 7.5 2.5-2 4.5-4.5 4.5-7.5 0-1.5-.5-3-1.5-4C15 3.5 13.5 3 12 3z"/></svg>;
    }
    if (filling.includes("فواكه") || filling.includes("فراولة") || filling.includes("توت")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3 0-5.5 2-6 5 .5-1 2-2 4-2s3.5 1 4 2c-.5-3-3-5-6-5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 9c-4 0-7 3-7 7 0 3 2 5 5 6 1 0 2 0 2 0s1 0 2 0c3-1 5-3 5-6 0-4-3-7-7-7z"/></svg>;
    }
    return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>;
  };

  const getCreamIcon = (value: string) => {
    const cream = value.toLowerCase();
    if (cream.includes("شانتيه") || cream.includes("مخفوق")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20c0-2 1-3 3-4 2 1 4 2 4 4 0 3-4 5-7 5s-7-2-7-5c0-2 2-3 4-4 2 1 3 2 3 4z"/></svg>;
    }
    if (cream.includes("زبدة")) {
      return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="10" width="18" height="8" rx="2"/><path strokeLinecap="round" strokeLinejoin="round" d="M7 10V8a5 5 0 0110 0v2"/></svg>;
    }
    return <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>;
  };

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
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

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
            {product.description && (
              <p className="text-sm leading-relaxed text-white/60">
                {product.description}
              </p>
            )}

            {/* Options */}
            {optionGroups.length > 0 && (
              <div className="space-y-6">
                {optionGroups.map((group) => (
                  <div key={group.name}>
                    <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                        {group.name === "المقاس" ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                        ) : group.name === "الحشوة" ? (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
                        ) : (
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                        )}
                      </span>
                      {group.name}
                      {group.type === "input" && (
                        <span className="text-xs text-emerald-400">(يُدخلها العميل)</span>
                      )}
                    </label>
                    
                    {group.type === "input" ? (
                      // Input type - user enters value
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValues[group.name] || ""}
                          onChange={(e) => setInputValues((prev) => ({ ...prev, [group.name]: e.target.value }))}
                          placeholder={`أدخل ${group.name} المطلوب`}
                          className="w-full rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-emerald-500 focus:bg-emerald-500/10"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <svg className="h-5 w-5 text-emerald-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                      </div>
                    ) : isCake ? (
                      // Cake fixed options - beautiful grid
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
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSelected ? "bg-amber-500 text-black" : "bg-white/10 text-white/50 group-hover:bg-amber-500/20 group-hover:text-amber-400"
                              }`}>
                                {group.name === "المقاس" && getCakeIcon(value)}
                                {group.name === "الحشوة" && getFillingIcon(value)}
                                {group.name === "نكهة الكريمة" && getCreamIcon(value)}
                              </div>
                              <span className={`flex-1 font-medium ${isSelected ? "text-white" : ""}`}>
                                {value}
                              </span>
                              {isSelected && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black">
                                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      // Regular fixed options - chips style
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

          <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
