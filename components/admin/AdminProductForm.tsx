"use client";

import { FormEvent, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductDTO, CategoryDTO } from "@/lib/types";
import type { ProductOptionGroup } from "@/lib/whatsapp";

type Props = {
  product?: ProductDTO | null;
  categories: CategoryDTO[];
  onSaved: () => void;
  onCancel: () => void;
};

function parseOptions(json: string): ProductOptionGroup[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AdminProductForm({ product, categories, onSaved, onCancel }: Props) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [weight, setWeight] = useState(product?.weight || "");
  const [pieces, setPieces] = useState(product?.pieces?.toString() || "");
  const [ingredients, setIngredients] = useState(product?.ingredients || "");
  const [wholesalePrice, setWholesalePrice] = useState(product?.wholesalePrice?.toString() || "");
  const [discount, setDiscount] = useState(product?.discount?.toString() || "0");
  const [category, setCategory] = useState(product?.category || (categories[0]?.name || "شوكولاتة"));
  const [sortOrder, setSortOrder] = useState(product?.sortOrder?.toString() || "0");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [options, setOptions] = useState<ProductOptionGroup[]>(
    product ? parseOptions(product.options) : [{ name: "الحجم", values: ["250غ", "500غ"] }]
  );
  
  // Image state
  const [imageUrl, setImageUrl] = useState(product?.image || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setUploadError(data.error || "فشل رفع الصورة");
        return;
      }

      const data = await res.json();
      setImageUrl(data.path);
    } catch {
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
        price: price ? parseFloat(price) : null,
        weight: weight.trim() || null,
        pieces: pieces ? parseInt(pieces, 10) : null,
        ingredients: ingredients.trim() || null,
        wholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
        discount: discount ? parseFloat(discount) : 0,
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
        <h3 className="font-[family-name:var(--font-amiri)] text-3xl font-bold text-navy">
          {product ? "تعديل المنتج" : "إضافة منتج جديد"}
        </h3>
        <p className="mt-2 text-sm text-navy/50">
          {product ? "قم بتعديل تفاصيل المنتج" : "أضف منتج جديد إلى مجموعتك"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-gold/10 bg-white p-6 shadow-soft"
        >
          <h4 className="mb-4 flex items-center gap-2 border-r-2 border-gold/30 pr-3 font-medium text-navy">
            صورة المنتج
          </h4>

          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {/* Image Preview */}
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-gold/30 bg-cream">
              {uploading ? (
                <div className="flex h-full w-full flex-col items-center justify-center text-navy/50">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold"
                  />
                  <span className="mt-2 text-xs">جاري الرفع...</span>
                </div>
              ) : imageUrl ? (
                <Image src={imageUrl} alt="Preview" fill className="object-cover" sizes="160px" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-navy/30">
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
                className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/20 disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {imageUrl ? "تغيير الصورة" : "اختر صورة"}
              </label>
              {uploadError && (
                <p className="mt-2 text-xs text-red-500">{uploadError}</p>
              )}
              <p className="mt-2 text-xs text-navy/50">
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
          className="rounded-3xl border border-gold/10 bg-white p-6 shadow-soft"
        >
          <h4 className="mb-6 flex items-center gap-2 border-r-2 border-gold/30 pr-3 font-medium text-navy">
            المعلومات الأساسية
          </h4>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-navy">اسم المنتج</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="input-premium" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy">الوصف</label>
              <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="input-premium resize-none" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">السعر (ل.س)</label>
                <input type="number" min="0" step="1" value={price} onChange={(e) => setPrice(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">سعر الجملة (ل.س)</label>
                <input type="number" min="0" step="1" value={wholesalePrice} onChange={(e) => setWholesalePrice(e.target.value)} placeholder="اختياري" className="input-premium" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">التخفيض (%)</label>
                <input type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">التصنيف</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-premium">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">الوزن</label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="مثال: 250غ" className="input-premium" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">عدد القطع</label>
                <input type="number" min="0" value={pieces} onChange={(e) => setPieces(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">ترتيب العرض</label>
                <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="input-premium" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy">المكونات</label>
              <textarea rows={2} value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="مثال: كاكاو، سكر..." className="input-premium resize-none" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">نشط</p>
                  <p className="text-xs text-navy/50">يظهر في الموقع</p>
                </div>
                <button type="button" onClick={() => setIsActive(!isActive)} className={`relative h-8 w-14 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-300"}`}>
                  <motion.span animate={{ x: isActive ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">منتج مميز</p>
                </div>
                <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`relative h-8 w-14 rounded-full transition-colors ${isFeatured ? "bg-gold" : "bg-gray-300"}`}>
                  <motion.span animate={{ x: isFeatured ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">الأكثر مبيعاً</p>
                </div>
                <button type="button" onClick={() => setIsBestSeller(!isBestSeller)} className={`relative h-8 w-14 rounded-full transition-colors ${isBestSeller ? "bg-rose-500" : "bg-gray-300"}`}>
                  <motion.span animate={{ x: isBestSeller ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">جديد</p>
                </div>
                <button type="button" onClick={() => setIsNew(!isNew)} className={`relative h-8 w-14 rounded-full transition-colors ${isNew ? "bg-emerald-500" : "bg-gray-300"}`}>
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
          className="rounded-3xl border border-gold/10 bg-white p-6 shadow-soft"
        >
          <div className="mb-6 flex items-center justify-between">
            <h4 className="flex items-center gap-2 border-r-2 border-gold/30 pr-3 font-medium text-navy">خيارات المنتج</h4>
            <button type="button" onClick={addOptionGroup} className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              إضافة مجموعة
            </button>
          </div>

          <div className="space-y-4">
            {options.map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="group rounded-2xl border border-gold/10 bg-cream/50 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <input value={group.name} onChange={(e) => updateOptionGroup(gi, { name: e.target.value })} placeholder="اسم الخيار" className="flex-1 rounded-xl border border-navy/10 bg-white px-4 py-2.5 text-sm" />
                  <button type="button" onClick={() => removeOptionGroup(gi)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-100">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
                <input value={group.values.join("، ")} onChange={(e) => updateOptionGroup(gi, { values: e.target.value.split(/[،,]/).map((v) => v.trim()).filter(Boolean) })} placeholder="القيم: 250غ، 500غ" className="w-full rounded-xl border border-navy/10 bg-white px-4 py-2.5 text-sm" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </motion.div>
        )}

        <div className="flex flex-wrap gap-4">
          <motion.button type="submit" disabled={loading || uploading} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-navy to-navy-light px-8 py-3.5 text-sm font-medium text-gold shadow-lg shadow-navy/30 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            {loading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-5 w-5 rounded-full border-2 border-gold/30 border-t-gold" />
                <span className="relative">جاري الحفظ...</span>
              </>
            ) : (
              <>
                <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                <span className="relative">حفظ</span>
              </>
            )}
          </motion.button>
          <motion.button type="button" onClick={onCancel} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 rounded-full border border-navy/15 px-8 py-3.5 text-sm font-medium text-navy/70 hover:border-navy/30 hover:bg-navy/5">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            إلغاء
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
