"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CategoryDTO } from "@/lib/types";

type Props = {
  categories: CategoryDTO[];
  onRefresh: () => void;
};

type CategoryFormData = {
  name: string;
  description: string;
  color: string;
};

const COLOR_PRESETS = [
  { name: "ذهبي", color: "#c9a961" },
  { name: "وردي", color: "#e8b4c8" },
  { name: "أخضر", color: "#98d8aa" },
  { name: "أزرق", color: "#a8d8ea" },
  { name: "أصفر", color: "#ffd93d" },
  { name: "أحمر", color: "#ff6b6b" },
  { name: "بنفسجي", color: "#dda0dd" },
  { name: "برتقالي", color: "#ffa07a" },
];

export default function CategoryManager({ categories, onRefresh }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDTO | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
    color: "#c9a961",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAdd() {
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: "#c9a961" });
    setShowForm(true);
  }

  function handleEdit(category: CategoryDTO) {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      color: category.color,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("اسم التصنيف مطلوب");
      return;
    }

    setLoading(true);

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "فشل الحفظ");
        return;
      }

      setShowForm(false);
      onRefresh();
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا التصنيف؟")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) onRefresh();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  }

  async function handleToggleActive(category: CategoryDTO) {
    try {
      await fetch(`/api/admin/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, isActive: !category.isActive }),
      });
      onRefresh();
    } catch (error) {
      console.error("Failed to toggle category:", error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-amiri)] text-2xl font-bold text-navy">
            إدارة التصنيفات
          </h3>
          <p className="mt-1 text-sm text-navy/50">{categories.length} تصنيف</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-light px-5 py-2.5 text-sm font-medium text-gold shadow-lg transition-all hover:shadow-xl"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          إضافة تصنيف
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="bg-gradient-to-r from-navy to-navy-light p-6">
                <h3 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-gold">
                  {editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy">
                    اسم التصنيف
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مثال: شوكولاتة"
                    className="input-premium"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-navy">
                    الوصف (اختياري)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="وصف مختصر للتصنيف..."
                    rows={2}
                    className="input-premium resize-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-navy">
                    اللون
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: preset.color })}
                        className={`h-10 w-10 rounded-full border-2 transition-all ${
                          formData.color === preset.color
                            ? "border-navy scale-110 shadow-lg"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: preset.color }}
                        title={preset.name}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 rounded-full border border-navy/15 px-5 py-3 text-sm font-medium text-navy/70 transition-colors hover:bg-navy/5"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-full bg-gradient-to-r from-navy to-navy-light px-5 py-3 text-sm font-medium text-gold transition-all hover:shadow-lg disabled:opacity-60"
                  >
                    {loading ? "جاري الحفظ..." : "حفظ"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`rounded-2xl border border-gold/10 bg-white p-5 shadow-soft transition-all ${
              !category.isActive ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-xl shadow-sm"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <h4 className="font-medium text-navy">{category.name}</h4>
                  {category.description && (
                    <p className="mt-0.5 text-xs text-navy/50 line-clamp-1">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleActive(category)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    category.isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                      category.isActive ? "left-6" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(category)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/15 bg-white px-3 py-2 text-xs font-medium text-navy transition-colors hover:border-gold hover:text-gold-dark"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                تعديل
              </button>
              <button
                type="button"
                onClick={() => handleDelete(category.id)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-100"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                حذف
              </button>
            </div>
          </motion.div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-navy/20 bg-white/50 py-12 text-center">
            <p className="text-navy/50">لا توجد تصنيفات</p>
          </div>
        )}
      </div>
    </div>
  );
}
