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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AdminProductForm from "./AdminProductForm";
import CategoryManager from "./CategoryManager";
import type { ProductDTO, CategoryDTO } from "@/lib/types";

type Tab = "products" | "categories";

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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-[#1a1a1a] shadow-2xl"
      >
        <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="font-['Amiri'] text-xl font-bold text-white">تأكيد الحذف</h3>
              <p className="text-sm text-white/50">لا يمكن التراجع عن هذا الإجراء</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-center text-white/60">هل أنت متأكد من حذف المنتج:</p>
          <p className="mt-2 text-center font-['Amiri'] text-lg font-bold text-white">{productName}</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
            >
              حذف المنتج
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SortableProductCard({
  product,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  product: ProductDTO;
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
    <div
      ref={setNodeRef}
      style={style}
      className="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#1a1a1a] p-4 transition-all hover:border-amber-500/20 sm:flex-row sm:items-center"
    >
      {/* Drag Handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-white/30 transition-colors hover:text-amber-400 active:cursor-grabbing sm:order-first"
        title="اسحب لإعادة الترتيب"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-amber-500/20 bg-[#0a0a0a]">
        <Image src={product.image || "/brand/packaging.png"} alt={product.name} fill className="object-cover" sizes="80px" />
        {product.isFeatured && (
          <div className="absolute -right-1 -top-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-black">مميز</div>
        )}
        {product.isBestSeller && (
          <div className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">terjual</div>
        )}
        {product.isNew && (
          <div className="absolute -right-1 -top-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">جديد</div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">{product.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/40">{product.description}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-xs text-amber-400">
          {product.category}
        </span>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onToggleActive(product.id, product.isActive)}
        className={`relative h-8 w-14 rounded-full transition-colors ${product.isActive ? "bg-green-500" : "bg-gray-600"}`}
      >
        <motion.span animate={{ x: product.isActive ? 28 : 4 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md" />
      </button>

      {/* Actions */}
      <div className="flex gap-2 sm:order-last">
        <motion.button
          type="button"
          onClick={() => onEdit(product)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400 transition-all hover:bg-amber-500/20"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="hidden sm:inline">تعديل</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => onDelete(product.id, product.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400 transition-all hover:bg-red-500/20"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("الكل");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.status === 401) { router.push("/admin/login"); return; }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { setProducts([]); }
  }, [router]);

  const fetchCategories = useCallback(async () => {
    try {
      await fetch("/api/admin/categories/init", { method: "POST" });
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch { setCategories([]); }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchProducts(), fetchCategories()]);
    setLoading(false);
  }, [fetchProducts, fetchCategories]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

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
    } catch (error) { console.error("Failed to toggle active state:", error); }
  }

  function handleDeleteClick(id: string, name: string) { setDeleteConfirm({ id, name }); }

  async function handleConfirmDelete() {
    if (!deleteConfirm) return;
    const res = await fetch(`/api/admin/products/${deleteConfirm.id}`, { method: "DELETE" });
    if (res.ok) fetchProducts();
    setDeleteConfirm(null);
  }

  function handleEdit(product: ProductDTO) { setEditingProduct(product); setShowForm(true); }
  function handleAdd() { setEditingProduct(null); setShowForm(true); }
  function handleSaved() { setShowForm(false); setEditingProduct(null); fetchProducts(); }
  function handleCancel() { setShowForm(false); setEditingProduct(null); }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id);
      const newIndex = products.findIndex((p) => p.id === over.id);
      const reorderedProducts = arrayMove(products, oldIndex, newIndex);
      setProducts(reorderedProducts);
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

  const productCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["الكل", ...cats];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }
    if (categoryFilter !== "الكل") result = result.filter((p) => p.category === categoryFilter);
    return result;
  }, [products, searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteConfirmModal productName={deleteConfirm.name} onConfirm={handleConfirmDelete} onCancel={() => setDeleteConfirm(null)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-amber-500/40">
              <Image src="/brand/logo.png" alt="BRIVIA" fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <h1 className="font-['Amiri'] text-lg font-bold text-white">BRIVIA</h1>
              <p className="text-xs text-white/40">لوحة الإدارة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition-colors hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400 sm:px-4">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">عرض الموقع</span>
            </Link>
            <motion.button type="button" onClick={handleLogout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 sm:px-4">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">خروج</span>
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl px-4">
          <button type="button" onClick={() => setActiveTab("products")} className={`relative px-5 py-3 text-sm font-medium transition-colors ${activeTab === "products" ? "text-amber-400" : "text-white/50 hover:text-white/70"}`}>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              <span className="hidden sm:inline">المنتجات</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs">{products.length}</span>
            </span>
            {activeTab === "products" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
          </button>
          <button type="button" onClick={() => setActiveTab("categories")} className={`relative px-5 py-3 text-sm font-medium transition-colors ${activeTab === "categories" ? "text-amber-400" : "text-white/50 hover:text-white/70"}`}>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              <span className="hidden sm:inline">التصنيفات</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs">{categories.length}</span>
            </span>
            {activeTab === "categories" && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
          </button>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div key="form" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
              <AdminProductForm product={editingProduct} categories={categories} onSaved={handleSaved} onCancel={handleCancel} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeTab === "products" && (
                <div>
                  {/* Stats */}
                  <div className="mb-6 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 sm:h-10 sm:w-10 sm:rounded-xl">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 sm:text-sm">المنتجات</p>
                          <p className="font-['Amiri'] text-lg font-bold text-white sm:text-xl">{products.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-500 sm:h-10 sm:w-10 sm:rounded-xl">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 sm:text-sm">الظاهرة</p>
                          <p className="font-['Amiri'] text-lg font-bold text-white sm:text-xl">{products.filter(p => p.isActive).length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 sm:h-10 sm:w-10 sm:rounded-xl">
                          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>
                        </div>
                        <div>
                          <p className="text-xs text-white/40 sm:text-sm">التصنيفات</p>
                          <p className="font-['Amiri'] text-lg font-bold text-white sm:text-xl">{new Set(products.map(p => p.category)).size}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Header & Add Button */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
                    <div>
                      <h2 className="font-['Amiri'] text-xl font-bold text-white sm:text-2xl">المنتجات</h2>
                      <p className="mt-1 flex items-center gap-2 text-xs text-white/40 sm:text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        {filteredProducts.length} منتج
                      </p>
                    </div>
                    <motion.button type="button" onClick={handleAdd} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/40 hover:bg-[position:100%_0] sm:px-6 sm:py-3">
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <svg className="relative h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      <span className="relative">إضافة</span>
                    </motion.button>
                  </div>

                  {/* Filters */}
                  <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row">
                    <div className="relative flex-1">
                      <svg className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <input type="text" placeholder="ابحث عن منتج..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" />
                      {searchQuery && (
                        <button type="button" onClick={() => setSearchQuery("")} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all focus:border-amber-500 sm:w-auto">
                      {productCategories.map((cat) => (<option key={cat} value={cat} className="bg-[#1a1a1a]">{cat}</option>))}
                    </select>
                  </div>

                  {/* Products List */}
                  {loading ? (
                    <div className="flex items-center justify-center py-20"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="h-12 w-12 rounded-full border-4 border-amber-500/20 border-t-amber-500" /></div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-16">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 sm:mb-6 sm:h-20 sm:w-20">
                        <svg className="h-8 w-8 text-white/20 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      </div>
                      <p className="text-base font-medium text-white/40 sm:text-lg">{searchQuery || categoryFilter !== "الكل" ? "لا توجد نتائج" : "لا توجد منتجات"}</p>
                    </div>
                  ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={filteredProducts.map((p) => p.id)} strategy={undefined}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                          {filteredProducts.map((product) => (
                            <SortableProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDeleteClick} onToggleActive={handleToggleActive} />
                          ))}
                        </motion.div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>
              )}

              {activeTab === "categories" && <CategoryManager categories={categories} onRefresh={fetchCategories} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
