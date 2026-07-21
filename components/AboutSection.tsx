"use client";

import Image from "next/image";

export default function AboutSection() {
  const features = [
    { icon: "quality", title: "جودة حرفية", desc: "نختار أجود المكونات العالمية" },
    { icon: "gift", title: "تغليف فاخر", desc: "تصاميم تليق بأجمل المناسبات" },
    { icon: "diamond", title: "فخامة", desc: "تجربة حلوى لا تُنسى" },
    { icon: "handshake", title: "خدمة مميزة", desc: "توصيل سريع وآمن" },
  ];

  const FeatureIcon = ({ type }: { type: string }) => {
    const iconClass = "h-6 w-6";
    switch (type) {
      case "quality":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        );
      case "gift":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        );
      case "diamond":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case "handshake":
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        );
    }
  };

  return (
    <section id="about" className="relative bg-navy py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Image Column */}
        <div className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-gold/30 shadow-gold-xl">
              <Image
                src="/brand/packaging.png"
                alt="تغليف BRIVIA الفاخر"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gold/30 bg-navy/90 p-5 shadow-gold-lg sm:-bottom-8 sm:-left-8">
              <div className="text-center">
                <p className="font-[family-name:var(--font-amiri)] text-3xl font-bold text-gold">+500</p>
                <p className="mt-1 text-xs text-cream/60">عميل سعيد</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="order-1 text-center lg:text-right">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-xs text-gold">
            قصتنا
          </div>

          <h2 className="font-[family-name:var(--font-heading)] font-bold text-gold" style={{ fontSize: 'var(--text-h1)' }}>
            عن <span className="text-gold-light">بريڤيا</span>
          </h2>

          <div className="mx-auto mt-4 h-0.5 w-20 bg-gradient-to-r from-gold to-transparent lg:mx-0" />

          <p className="mt-8 text-base leading-loose text-cream/70 sm:text-lg lg:max-w-lg lg:text-right">
            بريڤيا ليست مجرد حلويات — إنها تجربة فخامة تُقدَّم في كل قطعة. 
            نختار أجود المكونات ونصمّم تغليفاً يليق بالمناسبات الخاصة، 
            لنقدّم لك حلويات حرفية تجمع بين الذوق الرفيع والأناقة.
          </p>

          {/* Features Grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:max-w-lg lg:text-right">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-2xl border border-gold/10 bg-gold/5 p-4 transition-all duration-300 hover:border-gold/30 hover:bg-gold/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <FeatureIcon type={feature.icon} />
                </div>
                <div className="text-right">
                  <h4 className="font-[family-name:var(--font-amiri)] text-base font-bold text-gold">{feature.title}</h4>
                  <p className="text-xs text-cream/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#products" className="btn-gold">
              تصفح المنتجات
            </a>
            <a
              href="https://wa.me/963995939432"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
