"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "فشل تسجيل الدخول");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amber-400/5 blur-[100px]" />
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute h-2 w-2 rounded-full bg-amber-500/30" style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }} animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative w-full max-w-md">
        <div className="absolute -inset-4 rounded-3xl bg-amber-500/10 blur-2xl" />

        <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-[#1a1a1a] shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-500/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg" />

          <div className="relative p-8 sm:p-10">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="mb-8 flex flex-col items-center">
              <div className="group relative mb-4">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-[0_0_50px_rgba(251,191,36,0.4)]">
                  <Image src="/brand/logo.png" alt="BRIVIA" fill className="object-cover" sizes="80px" />
                </motion.div>
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-['Amiri'] text-2xl font-bold text-white">لوحة الإدارة</motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-1 text-sm text-white/40">أدخل كلمة المرور للمتابعة</motion.p>
            </motion.div>

            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/70">
                  <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />كلمة المرور</span>
                </label>
                <div className="relative">
                  <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pl-12 text-white placeholder:text-white/30 outline-none transition-all focus:border-amber-500 focus:bg-amber-500/5" placeholder="••••••••" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <svg className="h-5 w-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 transition-colors hover:text-white/60">
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </motion.div>
              )}

              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] py-4 text-sm font-semibold text-black shadow-lg shadow-amber-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/40 hover:bg-[position:100%_0] disabled:cursor-not-allowed disabled:opacity-60">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                {loading ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="relative h-5 w-5 rounded-full border-2 border-black/30 border-t-black" /><span className="relative">جاري الدخول...</span></>
                ) : (
                  <><svg className="relative h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg><span className="relative">دخول</span><svg className="relative h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                )}
              </motion.button>
            </motion.form>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-amber-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                العودة للموقع
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
          <span>BRIVIA</span><span>—</span><span>Premium Confectionery</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
