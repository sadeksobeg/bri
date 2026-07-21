# BRIVIA — Premium Confectionery Website

موقع حلويات فاخر باللغة العربية مع طلب عبر واتساب ولوحة إدارة.

## نظرة سريعة

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite via Prisma
- **Auth:** JWT session cookies
- **Language:** Arabic (RTL)

## التشغيل المحلي

### 1. تثبيت الحزم

```bash
npm install
```

### 2. إعداد قاعدة البيانات

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed    # بيانات تجريبية (اختياري)
```

### 3. تشغيل الموقع

```bash
npm run dev
```

- **الموقع:** http://localhost:3000
- **لوحة الإدارة:** http://localhost:3000/admin

### كلمة مرور الأدمن

تعيين في Netlify Dashboard أو ملف `.env`:
```bash
ADMIN_PASSWORD=your-secret-password
```

## الميزات

### الواجهة العامة
- Hero مبهر مع animations
- عرض المنتجات مع فلترة حسب التصنيف
- نافذة طلب أنيقة → إرسال عبر واتساب
- تصميم متجاوب (موبايل أولاً)

### لوحة الإدارة
- تسجيل دخول بكلمة مرور
- إضافة / تعديل / حذف المنتجات
- رفع صور المنتجات
- تحديد خيارات المنتج (حجم، نكهة، إلخ)
- إظهار / إخفاء المنتج من الموقع

## متغيرات البيئة (.env)

| المتغير | الوصف | الافتراضي |
|---------|--------|-----------|
| `ADMIN_PASSWORD` | كلمة مرور الأدمن | `***` (في Netlify) |
| `ADMIN_SECRET` | مفتاح توقيع JWT | — |
| `WHATSAPP_NUMBER` | رقم الواتساب | `963995939432` |
| `DATABASE_URL` | مسار قاعدة البيانات | `file:./dev.db` |

## هيكل المشروع

```
├── app/
│   ├── page.tsx              # الصفحة الرئيسية
│   ├── layout.tsx           # RTL + خطوط عربية
│   ├── admin/
│   │   ├── login/page.tsx   # تسجيل الدخول
│   │   └── page.tsx         # لوحة الإدارة
│   └── api/
│       ├── products/        # API المنتجات (عام)
│       └── admin/           # API الأدمن (محمي)
├── components/
│   ├── Hero.tsx
│   ├── ProductGrid.tsx
│   ├── ProductCard.tsx
│   ├── OrderModal.tsx       # نافذة الطلب
│   ├── Header.tsx / Footer.tsx
│   └── admin/
│       ├── AdminLoginForm.tsx
│       └── AdminProductForm.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── whatsapp.ts          # بناء رابط واتساب
│   └── types.ts
└── prisma/
    ├── schema.prisma
    └── seed.ts              # بيانات تجريبية
```

## النشر

### Vercel (الأسهل)

```bash
npm install -g vercel
vercel
```

### استضافة أخرى

1. شغّل `npm run build`
2. ارفع مجلد `.next`
3. تأكد من متغيرات البيئة على الاستضافة
4. أعد تشغيل migration على الاستضافة:
   ```bash
   npx prisma migrate deploy
   ```

## التقنيات المستخدمة

- [Next.js 15](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [Framer Motion](https://www.framer.com/)
- [Google Fonts — Amiri & Tajawal](https://fonts.google.com/)
