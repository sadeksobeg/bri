"use client";

import { FormEvent, useState } from "react";
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
  const [options, setOptions] = useState<ProductOptionGroup[]>(
    product ? parseOptions(product.options) : [{ name: "الحجم", values: ["250غ", "500غ"] }]
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image || null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("اسم المنتج مطلوب");
      return;
    }

    const priceNum = parseFloat(price);
    if (!price || isNaN(priceNum) || priceNum < 0) {
      setError("السعر يجب أن يكون رقماً موجباً");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);
      formData.set("price", price);
      formData.set("weight", weight);
      formData.set("pieces", pieces);
      formData.set("ingredients", ingredients);
      formData.set("wholesalePrice", wholesalePrice);
      formData.set("discount", discount);
      formData.set("category", category);
      formData.set("sortOrder", sortOrder);
      formData.set("isActive", String(isActive));
      formData.set("isFeatured", String(isFeatured));
      formData.set(
        "options",
        JSON.stringify(
          options
            .filter((g) => g.name.trim() && g.values.some((v) => v.trim()))
            .map((g) => ({
              name: g.name.trim(),
              values: g.values.map((v) => v.trim()).filter(Boolean),
            }))
        )
      );
      if (product?.image) formData.set("existingImage", product.image);
      if (imageFile) formData.set("image", imageFile);

      const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "فشل الحفظ");
        return;
      }
      onSaved();
    } catch {
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
      {/* Header */}
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
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-dashed border-gold/30 bg-cream transition-all hover:border-gold">
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="160px" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-navy/30">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="mt-2 text-xs">صورة المنتج</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/20"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                اختر صورة
              </label>
              {product?.image && !imageFile && (
                <p className="mt-2 text-xs text-navy/40">الصورة الحالية محفوظة</p>
              )}
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
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: شوكولاتة دARK"
                className="input-premium"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  الوصف
                </span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="وصف مختصر وجذاب للمنتج..."
                className="input-premium resize-none"
              />
            </div>

            {/* Prices Row */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    السعر الأساسي (ل.س)
                  </span>
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-premium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    سعر الجملة (ل.س)
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={wholesalePrice}
                  onChange={(e) => setWholesalePrice(e.target.value)}
                  placeholder="اختياري"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    التخفيض (%)
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="input-premium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    التصنيف
                  </span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-premium"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Details Row */}
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    الوزن
                  </span>
                </label>
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="مثال: 250غ"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    عدد القطع
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={pieces}
                  onChange={(e) => setPieces(e.target.value)}
                  placeholder="مثال: 12"
                  className="input-premium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-navy">
                  <span className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gold/60" />
                    ترتيب العرض
                  </span>
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="input-premium"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-navy">
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  المكونات (اختياري)
                </span>
              </label>
              <textarea
                rows={2}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="مثال: كاكاو، سكر، زبدة..."
                className="input-premium resize-none"
              />
            </div>

            {/* Toggles */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">حالة المنتج</p>
                  <p className="text-xs text-navy/50">هل يظهر المنتج في الموقع؟</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: isActive ? 28 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gold/10 bg-gold/5 p-4">
                <div>
                  <p className="font-medium text-navy">منتج مميز</p>
                  <p className="text-xs text-navy/50">يظهر في أعلى القائمة</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
                    isFeatured ? "bg-gold" : "bg-gray-300"
                  }`}
                >
                  <motion.span
                    animate={{ x: isFeatured ? 28 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
                  />
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
            <h4 className="flex items-center gap-2 border-r-2 border-gold/30 pr-3 font-medium text-navy">
              خيارات المنتج
            </h4>
            <button
              type="button"
              onClick={addOptionGroup}
              className="flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-dark"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إضافة مجموعة
            </button>
          </div>

          <div className="space-y-4">
            {options.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: gi * 0.05 }}
                className="group rounded-2xl border border-gold/10 bg-cream/50 p-4 transition-all duration-300 hover:border-gold/30"
              >
                <div className="mb-3 flex items-center gap-3">
                  <input
                    value={group.name}
                    onChange={(e) => updateOptionGroup(gi, { name: e.target.value })}
                    placeholder="اسم الخيار (مثال: الحجم)"
                    className="flex-1 rounded-xl border border-navy/10 bg-white px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={() => removeOptionGroup(gi)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition-all duration-300 hover:border-red-300 hover:bg-red-100"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <input
                  value={group.values.join("، ")}
                  onChange={(e) =>
                    updateOptionGroup(gi, {
                      values: e.target.value.split(/[،,]/).map((v) => v.trim()).filter(Boolean),
                    })
                  }
                  placeholder="القيم مفصولة بفاصلة (مثال: 250غ، 500غ)"
                  className="w-full rounded-xl border border-navy/10 bg-white px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-gold"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-navy to-navy-light px-8 py-3.5 text-sm font-medium text-gold shadow-lg shadow-navy/30 transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-gold/30 border-t-gold"
                />
                <span className="relative">جاري الحفظ...</span>
              </>
            ) : (
              <>
                <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="relative">حفظ</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-full border border-navy/15 px-8 py-3.5 text-sm font-medium text-navy/70 transition-all duration-300 hover:border-navy/30 hover:bg-navy/5"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            إلغاء
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
