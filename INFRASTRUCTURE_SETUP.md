# ═══════════════════════════════════════════════════════════════════════════════
# BRIVIA - دليل إعداد البنية التحتية
# ═══════════════════════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────────────────────
# المرحلة 1: إعداد Turso (قاعدة البيانات)
# ─────────────────────────────────────────────────────────────────────────────

## 1.1 إنشاء حساب Turso
1. اذهب إلى https://turso.tech
2. سجّل حساب جديد (مجاني)
3. من لوحة التحكم، أنشئ قاعدة بيانات جديدة:
   - الاسم: `brivia-db`
   - الموقع: اختر الأقرب لك (مثلاً `eu-central-1` أو `us-east-1`)
   - النوع: Development (مجاني)

## 1.2 الحصول على رابط قاعدة البيانات
بعد إنشاء قاعدة البيانات، ستجد في لوحة التحكم:
- **Database URL**: مثل `libsql://brivia-db-<username>.turso.io`
- **Auth Token**: مفتاح سري - انسخه فوراً!

## 1.3 إضافة المتغيرات في Netlify
اذهب إلى Netlify > Site Settings > Environment Variables وأضف:

```
DATABASE_URL = libsql://brivia-db-<username>.turso.io
TURSO_AUTH_TOKEN = <your-auth-token-here>
```

## 1.4 التحقق من الاتصال
بعد رفع التغييرات واكتمال البناء، ستعمل قاعدة البيانات مباشرة.

---

# ─────────────────────────────────────────────────────────────────────────────
# المرحلة 2: إعداد Cloudinary (رفع الصور)
# ─────────────────────────────────────────────────────────────────────────────

## 2.1 إنشاء حساب Cloudinary
1. اذهب إلى https://cloudinary.com
2. سجّل حساب مجاني (Free tier)
3. من لوحة التحكم، انسخ القيم التالية:
   - **Cloud Name**: موجود في Dashboard
   - **API Key**: من Settings > API Keys
   - **API Secret**: من Settings > API Keys (اضغط Show)

## 2.2 إضافة المتغيرات في Netlify
أضف في Environment Variables:

```
CLOUDINARY_CLOUD_NAME = <your-cloud-name>
CLOUDINARY_API_KEY = <your-api-key>
CLOUDINARY_API_SECRET = <your-api-secret>
```

## 2.3 إنشاء مجلد للمنتجات (اختياري)
في Cloudinary Dashboard > Media Library، أنشئ مجلد اسمه `brivia/products`

---

# ─────────────────────────────────────────────────────────────────────────────
# المرحلة 3: تحديث .env المحلي (للاختبار المحلي)
# ─────────────────────────────────────────────────────────────────────────────

انسخ هذه القيم في ملف `.env` المحلي لديك:

```env
# Turso Database
DATABASE_URL=libsql://brivia-db-<username>.turso.io
TURSO_AUTH_TOKEN=<your-auth-token>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Admin (غيّر هذه القيم!)
ADMIN_SECRET=<generate-a-32-char-random-string>
# ADMIN_PASSWORD=<set-in-netlify-dashboard>
```

## لإنشاء مفتاح ADMIN_SECRET آمن:
شغّل هذا الأمر:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

# ─────────────────────────────────────────────────────────────────────────────
# المرحلة 4: المتغيرات الإلزامية في Netlify
# ─────────────────────────────────────────────────────────────────────────────

تأكد من وجود هذه المتغيرات في Netlify:

| المتغير | الوصف | ملاحظات |
|---------|-------|---------|
| `DATABASE_URL` | رابط Turso | `libsql://...turso.io` |
| `TURSO_AUTH_TOKEN` | مفتاح Turso | سري جداً! |
| `CLOUDINARY_CLOUD_NAME` | اسم Cloudinary | عام |
| `CLOUDINARY_API_KEY` | مفتاح API | عام |
| `CLOUDINARY_API_SECRET` | سر API | سري! |
| `ADMIN_SECRET` | مفتاح JWT | 32+ حرف عشوائي |
| `ADMIN_PASSWORD` | كلمة مرور الأدمن | أو استخدم ADMIN_PASSWORD_HASH |

---

# ─────────────────────────────────────────────────────────────────────────────
# المرحلة 5: اختبار فعلي
# ─────────────────────────────────────────────────────────────────────────────

بعد إكمال جميع الإعدادات:

1. ارفع الكود: `git push`
2. انتظر بناء Netlify
3. افتح `https://brivia.netlify.app/admin`
4. سجّل الدخول
5. أضف منتج تجريبي بصورة حقيقية
6. تأكد من ظهوره في الصفحة الرئيسية
7. احذف المنتج التجريبي

---

# ─────────────────────────────────────────────────────────────────────────────
# ملاحظات مهمة
# ─────────────────────────────────────────────────────────────────────────────

⚠️ **الأمان:**
- لا تشارك TURSO_AUTH_TOKEN مع أحد
- لا تضعه في Git
- استخدم مفتاح ADMIN_SECRET قوي (32+ حرف)

💡 **التكلفة:**
- Turso: مجاني حتى 9GB تخزين
- Cloudinary: مجاني حتى 25MB شهرياً (كافي للموقع)

🔧 **إن واجهت مشاكل:**
- تحقق من Console في DevTools
- تحقق من Netlify Function logs
- تأكد من صحة المتغيرات
