"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminProductForm from "./AdminProductForm";
import type { ProductDTO } from "@/lib/types";

function DeleteConfirmModal({
  productName,
  onConfirm,
  onCancel,
}: {
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy/80 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="bg-gradient-to-r from-navy to-navy-light p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-gold">تأكيد الحذف</h3>
              <p className="text-sm text-cream/70">لا يمكن التراجع عن هذا الإجراء</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-center text-navy/70">
            هل أنت متأكد من حذف المنتج:
          </p>
          <p className="mt-2 text-center font-[family-name:var(--font-amiri)] text-lg font-bold text-navy">
            {productName}
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-navy/15 px-6 py-3 text-sm font-medium text-navy/70 transition-all duration-300 hover:border-navy/30 hover:bg-navy/5"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              حذف المنتج
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SortableRow({
  product,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  product: ProductDTO;
  index: number;
  onEdit: (p: ProductDTO) => void;
  onDelete: (id: string, name: string) => void;
  onToggleActive: (id: string, current: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="group border-b border-gold/5 bg-white transition-colors duration-300 hover:bg-gold/5"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none p-1 text-navy/30 transition-colors hover:text-gold active:cursor-grabbing"
            title="اسحب لإعادة الترتيب"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gold/20 bg-cream shadow-sm transition-all duration-300 group-hover:border-gold/40">
            <Image
              src={product.image || "/brand/packaging.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <p className="font-medium text-navy">{product.name}</p>
            <p className="mt-0.5 line-clamp-1 text-xs text-navy/50">{product.description}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs text-gold-dark">
          <span className="h-1 w-1 rounded-full bg-gold" />
          {product.category}
        </span>
      </td>
      <td className="px-4 py-4">
        <span className="font-[family-name:var(--font-amiri)] text-base font-bold text-gold-dark">
          {product.price.toLocaleString("en-US")}
        </span>
        <span className="mr-1 text-xs text-navy/40">ل.س</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => onToggleActive(product.id, product.isActive)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
              product.isActive ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <motion.span
              animate={{ x: product.isActive ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-xs ${product.isActive ? "text-green-600" : "text-gray-400"}`}>
            {product.isActive ? "ظاهر" : "مخفي"}
          </span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <motion.button
            type="button"
            onClick={() => onEdit(product)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-lg border border-navy/15 bg-white px-3 py-1.5 text-xs font-medium text-navy transition-all duration-300 hover:border-gold hover:text-gold-dark"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            تعديل
          </motion.button>
          <motion.button
            type="button"
            onClick={() => onDelete(product.id, product.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-300 hover:border-red-300 hover:bg-red-100"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            حذف
          </motion.button>
        </div>
      </td>
    </tr>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("الكل");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleToggleActive(id: string, currentState: boolean) {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) return;
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...product, isActive: !currentState }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error("Failed to toggle active state:", error);
    }
  }

  function handleDeleteClick(id: string, name: string) {
    setDeleteConfirm({ id, name });
  }

  async function handleConfirmDelete() {
    if (!deleteConfirm) return;
    const res = await fetch(`/api/admin/products/${deleteConfirm.id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    setDeleteConfirm(null);
  }

  function handleEdit(product: ProductDTO) {
    setEditingProduct(product);
    setShowForm(true);
  }

  function handleAdd() {
    setEditingProduct(null);
    setShowForm(true);
  }

  function handleSaved() {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProduct(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id);
      const newIndex = products.findIndex((p) => p.id === over.id);
      const reorderedProducts = arrayMove(products, oldIndex, newIndex);
      setProducts(reorderedProducts);

      // Update sortOrder for all products
      await Promise.all(
        reorderedProducts.map((p, index) =>
          fetch(`/api/admin/products/${p.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...p, sortOrder: index }),
          })
        )
      );
    }
  }

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["الكل", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    if (categoryFilter !== "الكل") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    return result;
  }, [products, searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-light to-cream">
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteConfirmModal
            productName={deleteConfirm.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 border-b border-gold/10 bg-navy/95 backdrop-blur-xl shadow-lg shadow-navy/20"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/40 shadow-gold transition-all duration-300"
            >
              <Image src="/brand/logo.png" alt="BRIVIA" fill className="object-cover" sizes="48px" />
            </motion.div>
            <div>
              <h1 className="font-[family-name:var(--font-amiri)] text-xl font-bold text-gold">
                لوحة إدارة BRIVIA
              </h1>
              <p className="text-xs text-cream/50">إدارة المنتجات</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold sm:flex"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              عرض الموقع
            </Link>

            <motion.button
              type="button"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm text-cream/80 transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              خروج
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <AdminProductForm
                product={editingProduct}
                onSaved={handleSaved}
                onCancel={handleCancel}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] font-bold text-navy" style={{ fontSize: 'var(--text-h1)' }}>
                    المنتجات
                  </h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-navy/50">
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    {filteredProducts.length} منتج
                    {filteredProducts.length !== products.length && (
                      <span className="text-gold">(من {products.length})</span>
                    )}
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={handleAdd}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-navy to-navy-light px-6 py-3 text-sm font-medium text-gold shadow-lg shadow-navy/30 transition-all duration-300 hover:shadow-xl"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="relative">إضافة منتج</span>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-6 flex flex-wrap gap-4"
              >
                <div className="relative flex-1 min-w-[200px]">
                  <svg className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-gold/20 bg-white px-12 py-3 text-sm text-navy outline-none transition-all duration-300 focus:border-gold focus:shadow-lg focus:shadow-gold/10"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-gold/20 bg-white px-5 py-3 text-sm text-navy outline-none transition-all duration-300 focus:border-gold"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-2xl border border-gold/10 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-gold/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-navy/50">إجمالي المنتجات</p>
                      <p className="font-[family-name:var(--font-amiri)] text-xl font-bold text-navy">{products.length}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-2xl border border-gold/10 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-gold/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-navy/50">المنتجات الظاهرة</p>
                      <p className="font-[family-name:var(--font-amiri)] text-xl font-bold text-navy">{products.filter(p => p.isActive).length}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-2xl border border-gold/10 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-gold/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-navy/50">التصنيفات</p>
                      <p className="font-[family-name:var(--font-amiri)] text-xl font-bold text-navy">{new Set(products.map(p => p.category)).size}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-2xl border border-gold/10 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-gold/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-navy/50">متوسط السعر</p>
                      <p className="font-[family-name:var(--font-amiri)] text-xl font-bold text-navy">
                        {products.length ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length).toLocaleString("en-US") : 0}
                        <span className="mr-1 text-xs font-normal text-navy/50">ل.س</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-12 w-12 rounded-full border-4 border-gold/20 border-t-gold"
                  />
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy/20 bg-white py-20"
                >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-navy/5">
                    <svg className="h-10 w-10 text-navy/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-navy/50">
                    {searchQuery || categoryFilter !== "الكل"
                      ? "لا توجد نتائج مطابقة"
                      : "لا توجد منتجات بعد"}
                  </p>
                  <p className="mt-2 text-sm text-navy/30">
                    {searchQuery || categoryFilter !== "الكل"
                      ? "جرب تغيير كلمات البحث أو الفلتر"
                      : "ابدأ بإضافة أول منتج"}
                  </p>
                  {(searchQuery || categoryFilter !== "الكل") && (
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setCategoryFilter("الكل"); }}
                      className="mt-6 text-sm font-medium text-gold hover:underline"
                    >
                      مسح البحث
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-3xl border border-gold/10 bg-white shadow-soft-lg"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-sm">
                      <thead>
                        <tr className="border-b border-gold/10 bg-gradient-to-r from-gold/5 to-transparent">
                          <th className="px-6 py-4 text-right font-medium text-navy/70">المنتج</th>
                          <th className="px-4 py-4 text-right font-medium text-navy/70">التصنيف</th>
                          <th className="px-4 py-4 text-right font-medium text-navy/70">السعر</th>
                          <th className="px-4 py-4 text-center font-medium text-navy/70">الحالة</th>
                          <th className="px-4 py-4 text-center font-medium text-navy/70">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={filteredProducts.map((p) => p.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {filteredProducts.map((product, index) => (
                              <SortableRow
                                key={product.id}
                                product={product}
                                index={index}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                onToggleActive={handleToggleActive}
                              />
                            ))}
                          </SortableContext>
                        </DndContext>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
