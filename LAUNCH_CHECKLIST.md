# BRIVIA Launch Checklist
## متطلبات ما قبل الإطلاق

---

## ✅ تم إنجازه

### 1. PWA Support
- [x] `public/manifest.json` - تم إنشاؤه
- [x] Icons متحركة (192x192, 512x512) - `app/icon-192/route.tsx`, `app/icon-512/route.tsx`
- [x] OG Image ديناميكية - `app/og/route.tsx`
- [x] Shorcuts للـ PWA (المنتجات، واتساب)

### 2. Security Headers
- [x] `netlify.toml` - تم إنشاؤه مع:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection
  - Content-Security-Policy
  - Cache headers محسنة

### 3. Performance
- [x] `next.config.ts` محسّن:
  - Image optimization مع AVIF/WebP
  - Compression enabled
  - DNS prefetch
  - Redirects للـ SEO

### 4. Accessibility
- [x] `components/AccessibilityHelper.tsx`:
  - Skip to content link
  - Focus management
  - Screen reader announcements
  - Keyboard navigation improvements
  - Reduced motion support

### 5. Environment Variables
- [x] `.env.local` - تم إنشاؤه مع Cloudinary credentials

---

## ⚠️ يحتاج إعداد يدوي في Netlify

### 1. Environment Variables في Netlify Dashboard

اذهب إلى: **Site configuration → Environment variables**

أضف هذه المتغيرات:

| Variable | Value | Notes |
|----------|-------|-------|
| `CLOUDINARY_CLOUD_NAME` | `h2pokbe8` | من Cloudinary |
| `CLOUDINARY_API_KEY` | `815384168494117` | من Cloudinary |
| `CLOUDINARY_API_SECRET` | `rL2Uj3L4qT8xB7dG6nZ2wY9cA5vK1jR` | من Cloudinary |
| `DATABASE_URL` | `libsql://[db-name].turso.io` | من Turso |
| `TURSO_AUTH_TOKEN` | `[token]` | من Turso |
| `NEXT_PUBLIC_SITE_URL` | `https://brivia.netlify.app` | أو رابط موقعك |

### 2. Netlify.toml

الملف `netlify.toml` تم إنشاؤه ويتضمن:
- Build command: `npx prisma generate && npx next build`
- Security headers
- Cache headers

### 3. Trigger Deploy

بعد إضافة Environment variables:
1. اذهب إلى **Deploys**
2. اضغط **Trigger deploy**
3. اختر **Clear cache and deploy site**

---

## 🔧 خطوات ما بعد الإطلاق

### 1. اختبار Dashboard
- [ ] تحقق من `/admin` يعمل
- [ ] جرب رفع صورة منتج
- [ ] جرب إضافة/تعديل/حذف منتج

### 2. اختبار الموقع العام
- [ ] المنتجات تظهر بشكل صحيح
- [ ] الصور تحمل من Cloudinary
- [ ] زر واتساب يعمل

### 3. SEO
- [ ] تحقق من `https://brivia.netlify.app/sitemap.xml`
- [ ] تحقق من `https://brivia.netlify.app/robots.txt`
- [ ] جرب OG image على LinkedIn/Facebook

### 4. PWA
- [ ] افتح الموقع على موبايل
- [ ] جرب "Add to Home Screen"
- [ ] تأكد الأيقونة تظهر

---

## 📁 هيكل الملفات

```
public/
├── manifest.json          # PWA manifest
├── showcase/              # صور المعرض
└── uploads/               # صور مرفوعة (Gitkeep)

app/
├── og/route.tsx           # OG Image API
├── icon.tsx               # Favicon API
├── icon-192/route.tsx     # PWA icon 192px
├── icon-512/route.tsx     # PWA icon 512px
├── sitemap.ts             # Sitemap
├── robots.ts              # Robots.txt
└── ...

components/
├── AccessibilityHelper.tsx  # تحسينات accessibility
└── ...

netlify.toml               # Netlify configuration
.env.local                # Environment variables (local)
```

---

## 🆘 في حالة وجود مشكلة

### المشكلة: "حدث خطأ أثناء رفع الملف"
1. تأكد من `CLOUDINARY_API_KEY` و `CLOUDINARY_API_SECRET`
2. تأكد من `CLOUDINARY_CLOUD_NAME`
3. Trigger deploy جديد

### المشكلة: "فشل جلب المنتجات"
1. تأكد من `DATABASE_URL` و `TURSO_AUTH_TOKEN`
2. تحقق من أن قاعدة البيانات Turso تعمل
3. Trigger deploy جديد

### المشكلة: 404 على صفحة المنتجات
1. تأكد من `NEXT_PUBLIC_SITE_URL`
2. Trigger deploy جديد

---

## 📞 معلومات التواصل

- **واتساب**: https://wa.me/963995939432
- **إنستغرام**: https://instagram.com/brivia

---

*آخر تحديث: 27 يوليو 2026*
