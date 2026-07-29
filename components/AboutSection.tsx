"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/brand/packaging.png"
                  alt="BRIVIA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-amber-600">
              من نحن
            </span>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
              عن <span className="text-amber-600">BRIvIA</span>
            </h2>
            
            <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
              BRIvIA ليست مجرد حلويات — إنها تجربة فخامة في كل قطعة. 
              نختار أجود المكونات ونصمّم تغليفاً يليق بالمناسبات الخاصة، 
              لنقدّم لك حلويات حرفية تجمع بين الذوق الرفيع والأناقة.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "⭐", title: "جودة عالية", desc: "أجود المكونات" },
                { icon: "🎁", title: "تغليف فاخر", desc: "مناسب للهدايا" },
                { icon: "✨", title: "فخامة", desc: "تجربة مميزة" },
                { icon: "🚚", title: "توصيل سريع", desc: "خدمة ممتازة" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-right">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#products"
                className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-amber-600"
              >
                تصفح المنتجات
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://wa.me/963995939432"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-all hover:border-green-500 hover:text-green-600"
              >
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                تواصل معنا
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
