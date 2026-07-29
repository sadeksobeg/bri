"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]" />
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`, backgroundSize: '80px 80px' }} 
        />
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Main Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/brand/packaging.png"
                  alt="BRIVIA Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/10 to-transparent blur-3xl -z-10" />

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-4 rounded-2xl border border-amber-500/20 bg-[#121212]/90 p-5 backdrop-blur-xl shadow-2xl lg:-bottom-8 lg:-right-8"
              >
                <div className="text-center">
                  <p className="font-['Amiri'] text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">+500</p>
                  <p className="mt-1 text-xs text-white/50">عميل سعيد</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-right"
          >
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/60" />
              <span className="text-xs tracking-[0.4em] text-amber-500/80">OUR STORY</span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/60" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 font-['Amiri'] text-4xl font-bold text-white lg:text-5xl"
            >
              عن <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">BRIvIA</span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 h-[2px] w-20 bg-gradient-to-r from-amber-500/60 to-transparent lg:mx-0"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-10 text-base leading-relaxed text-white/60 lg:text-lg"
            >
              BRIvIA ليست مجرد حلويات — إنها تجربة فخامة تُقدَّم في كل قطعة. 
              نختار أجود المكونات ونصمّم تغليفاً يليق بالمناسبات الخاصة، 
              لنقدّم لك حلويات حرفية تجمع بين الذوق الرفيع والأناقة العصرية.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: "✨", title: "جودة عالية", desc: "أجود المكونات" },
                { icon: "🎁", title: "تغليف فاخر", desc: "مناسب للهدايا" },
                { icon: "⭐", title: "فخامة", desc: "تجربة مميزة" },
                { icon: "🚀", title: "توصيل سريع", desc: "خدمة ممتازة" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06]"
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <div className="text-right">
                    <h4 className="font-semibold text-white/90">{feature.title}</h4>
                    <p className="text-xs text-white/40">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-[length:200%_100%] px-8 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(251,191,36,0.3)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(251,191,36,0.5)] hover:bg-[position:100%_0]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  تصفح المنتجات
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
              <motion.a
                href="https://wa.me/963995939432"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-green-500/50 hover:bg-green-500/10"
              >
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                تواصل معنا
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  );
}
