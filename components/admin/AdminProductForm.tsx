"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductDTO, CategoryDTO } from "@/lib/types";
import type { ProductOptionGroup } from "@/lib/whatsapp";

// Compress image before upload (max 1MB, 1200px width)
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const MAX_WIDTH = 1200;
      const MAX_HEIGHT = 1200;

      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = window.document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not create blob"));
            return;
          }
          if (blob.size <= 1024 * 1024) {
            resolve(new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }));
            return;
          }
          canvas.toBlob(
            (blob2) => {
              if (!blob2) {
                reject(new Error("Could not create blob"));
                return;
              }
              resolve(new File([blob2], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" }));
            },
            "image/webp",
            0.7
          );
        },
        "image/webp",
        0.85
      );
    };
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = URL.createObjectURL(file);
  });
}

// Convert file to base64 string
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

type Props = {
  product?: ProductDTO | null;
  categories: CategoryDTO[];
  onSaved: () => void;
  onCancel: () => void;
};

// Default options for cakes
const DEFAULT_CAKE_OPTIONS = [
  { name: "المقاس", values: ["4 أشخاص - 12سم", "6 أشخاص - 16سم", "10 أشخاص - 20سم"] },
];

// Default options for non-cake products
const DEFAULT_PRODUCT_OPTIONS = [
  { name: "الوزن", values: ["250غ", "500غ"] },
];

function getDefaultOptions(isCake: boolean): ProductOptionGroup[] {
  return isCake ? DEFAULT_CAKE_OPTIONS : DEFAULT_PRODUCT_OPTIONS;
}

function parseOptions(json: string | null | undefined): ProductOptionGroup[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

// Preset options for cakes
const CAKE_PRESETS = {
  size: {
    name: "المقاس",
    values: [
      "4 أشخاص - 12سم",
      "6 أشخاص - 16سم",
      "10 أشخاص - 20سم",
      "12 شخص - 24سم",
      "16 شخص - 28سم",
    ],
  },
  filling: {
    name: "الحشوة",
    values: [
      "شوكولاتة",
      "كراميل",
      "مكسرات",
      "فواكه طازجة",
      "صوص فريز",
      "صوص أناناس",
      "صوص فواكه",
    ],
  },
  creamFlavor: {
    name: "نكهة الكريمة",
    values: [
      "كابتشينو",
      "ميلو",
      "هوت شوكلت",
      "نسكافيه",
    ],
  },
};

export default function AdminProductForm({ product, categories, onSaved, onCancel }: Props) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [ingredients, setIngredients] = useState(product?.ingredients || "");
  const [category, setCategory] = useState(product?.category || (categories[0]?.name || "كيك"));
  const [sortOrder, setSortOrder] = useState(product?.sortOrder?.toString() || "0");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [options, setOptions] = useState<ProductOptionGroup[]>(() => {
    const parsedOptions = product ? parseOptions(product.options) : [];
    return parsedOptions.length > 0 ? parsedOptions : getDefaultOptions(category === "كيك");
  });
  const [isCake, setIsCake] = useState(category === "كيك");
  const [cakePreset, setCakePreset] = useState<"size" | "filling" | "cream">("size");
  
  // Image state
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  const [weight, setWeight] = useState(product?.weight || "");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync category with isCake
  useEffect(() => {
    setIsCake(category === "كيك");
  }, [category]);

  // Update options when category changes (for new products only)
  useEffect(() => {
    // Only reset options if this is a new product (no existing product prop)
    if (!product) {
      const currentOptions = options;
      // Check if options are still the defaults
      const hasDefaultCakeOptions = currentOptions.length === 3 && 
        currentOptions.some(g => g.name === "المقاس" && g.values.includes("4 أشخاص - 12سم"));
      const hasDefaultProductOptions = currentOptions.length === 1 && 
        currentOptions.some(g => g.name === "الوزن" && g.values.includes("250غ"));
      
      if ((category === "كيك" && hasDefaultProductOptions) ||
          (category !== "كيك" && hasDefaultCakeOptions)) {
        setOptions(getDefaultOptions(category === "كيك"));
      }
    }
  }, [category, product]);

  // Apply cake preset
  const applyCakePreset = (preset: "size" | "filling" | "cream") => {
    const presetMap: Record<string, { name: string; values: string[] }> = {
      size: CAKE_PRESETS.size,
      filling: CAKE_PRESETS.filling,
      cream: CAKE_PRESETS.creamFlavor,
    };
    const presetData = presetMap[preset];
    
    setOptions((prev) => {
      const existing = prev.findIndex((g) => g.name === presetData.name);
      if (existing >= 0) {
        // Update existing group
        return prev.map((g, i) => i === existing ? { ...presetData } : g);
      }
      // Add new group
      return [...prev, { ...presetData }];
    });
  };

  function updateOptionGroup(index: number, patch: Partial<ProductOptionGroup>) {
    setOptions((prev) => prev.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  }

  function addOptionGroup() {
    setOptions((prev) => [...prev, { name: "", values: [""] }]);
  }

  function removeOptionGroup(index: number) {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const compressedFile = await compressImage(file);
      const base64 = await fileToBase64(compressedFile);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64,
          mimeType: compressedFile.type,
          name: compressedFile.name,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error || "فشل رفع الصورة");
        return;
      }

      const data = await res.json();
      setImageUrl(data.path);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("فشل رفع الصورة");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("اسم المنتج مطلوب");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name: name.trim(),
        description: description.trim(),
        ingredients: ingredients.trim() || null,
        weight: weight.trim() || null,
        category: category.trim(),
        sortOrder: sortOrder ? parseInt(sortOrder, 10) : 0,
        isActive,
        isFeatured,
        isBestSeller,
        isNew,
        image: imageUrl || "/brand/packaging.png",
        options: JSON.stringify(
          options
            .filter((g) => g.name.trim() && g.values.some((v) => v.trim()))
            .map((g) => ({
              name: g.name.trim(),
              values: g.values.map((v) => v.trim()).filter(Boolean),
            }))
        ),
      };

      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "فشل الحفظ");
        return;
      }

      onSaved();
    } catch (err) {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mx-auto max-w-4xl"
    >
      <div className="mb-8">
        <h3 className="font-['Amiri'] text-3xl font-bold text-white">
          {product ? "تعديل المنتج" : "إضافة منتج جديد"}
        </h3>
        <p className="mt-2 text-sm text-white/50">
          {product ? "قم بتعديل تفاصيل المنتج" : "أضف منتج جديد إلى مجموعتك"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-[#1a1a1a] p-6"
        >
          <h4 className="mb-4 flex items-center gap-2 border-r-2 border-amber-500/30 pr-3 font-medium text-white">
            صورة المنتج
          </h4>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Image Preview */}
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-amber-500/30 bg-[#0a0a0a]">
              {uploading ? (
                <div className="flex h-full w-full flex-col items-center justify-center text-white/50">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500"
                  />
                  <span className="mt-2 text-xs">جاري الرفع...</span>
                </div>
              ) : imageUrl ? (
                <Image src={imageUrl} alt="Preview" fill className="object-cover" sizes="160px" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-white/30">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="mt-2 text-xs">صورة المنتج</span>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-medium text-amber-400 transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/20 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {imageUrl ? "تغيير الصورة" : "اختر صورة"}
              </label>
              {uploadError && (
                <p className="mt-2 text-xs text-red-400">{uploadError}</p>
              )}
              <p className="mt-2 text-xs text-white/40">
                PNG, JPG, WEBP - حتى 8MB
              </p>
            </div>
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl border border-white/10 bg-[#1a1a1a] p-6"
        >
          <h4 className="mb-6 flex items-center gap-2 border-r-2 border-amber-500/30 pr-3 font-medium text-white">
            المعلومات الأساسية
          </h4>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">اسم المنتج</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" placeholder="مثال: كيك شوكولاتة" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">الوصف</label>
              <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" placeholder="وصف مميز للمنتج..." />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">التصنيف</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name} className="bg-[#1a1a1a]">{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">ترتيب العرض</label>
                <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">المكونات</label>
              <textarea rows={2} value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="مثال: كاكاو، سكر..." className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" />
            </div>

            {!isCake && (
              <div>
                <label className="mb-2 block text-sm font-medium text-white/70">الوزن</label>
                <input 
                  type="text" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="مثال: 250غ، 500غ، 1كغ"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5"
                />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">نشط</p>
                  <p className="text-xs text-white/40">يظهر في الموقع</p>
                </div>
                <button type="button" onClick={() => setIsActive(!isActive)} className={`relative h-8 w-14 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-600"}`}>
                  <motion.span animate={{ x: isActive ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">منتج مميز</p>
                </div>
                <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`relative h-8 w-14 rounded-full transition-colors ${isFeatured ? "bg-amber-500" : "bg-gray-600"}`}>
                  <motion.span animate={{ x: isFeatured ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">الأكثر مبيعاً</p>
                </div>
                <button type="button" onClick={() => setIsBestSeller(!isBestSeller)} className={`relative h-8 w-14 rounded-full transition-colors ${isBestSeller ? "bg-rose-500" : "bg-gray-600"}`}>
                  <motion.span animate={{ x: isBestSeller ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium text-white">جديد</p>
                </div>
                <button type="button" onClick={() => setIsNew(!isNew)} className={`relative h-8 w-14 rounded-full transition-colors ${isNew ? "bg-emerald-500" : "bg-gray-600"}`}>
                  <motion.span animate={{ x: isNew ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-[#1a1a1a] p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h4 className="flex items-center gap-2 border-r-2 border-amber-500/30 pr-3 font-medium text-white">خيارات المنتج</h4>
            <button type="button" onClick={addOptionGroup} className="flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              إضافة مجموعة
            </button>
          </div>

          {/* Cake Quick Presets */}
          {isCake && (
            <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="mb-3 text-sm font-medium text-amber-400">إضافة سريعة لخيارات الكيك:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyCakePreset("size")}
                  className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-300 transition-all hover:bg-amber-500/30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  المقاسات
                </button>
                <button
                  type="button"
                  onClick={() => applyCakePreset("filling")}
                  className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-300 transition-all hover:bg-amber-500/30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  الحشوات
                </button>
                <button
                  type="button"
                  onClick={() => applyCakePreset("cream")}
                  className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm text-amber-300 transition-all hover:bg-amber-500/30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                  نكهات الكريمة
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {options.map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <input value={group.name} onChange={(e) => updateOptionGroup(gi, { name: e.target.value })} placeholder="اسم الخيار" className="flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500" />
                  <button type="button" onClick={() => removeOptionGroup(gi)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <input value={group.values.join("، ")} onChange={(e) => updateOptionGroup(gi, { values: e.target.value.split(/[،,]/).map((v) => v.trim()).filter(Boolean) })} placeholder="القيم: 250غ، 500غ" className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </motion.div>
        )}

        <div className="flex flex-wrap gap-4">
          <motion.button type="submit" disabled={loading || uploading} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-8 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/40 hover:bg-[position:100%_0] disabled:cursor-not-allowed disabled:opacity-60">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="relative h-5 w-5 rounded-full border-2 border-black/30 border-t-black" />
                <span className="relative">جاري الحفظ...</span>
              </>
            ) : (
              <>
                <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="relative">حفظ</span>
              </>
            )}
          </motion.button>
          <motion.button type="button" onClick={onCancel} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            إلغاء
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
