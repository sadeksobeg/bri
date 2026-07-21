import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal } from "next/font/google";
import "./globals.css";
import FloatingCandies from "@/components/FloatingCandies";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brivia.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BRIVIA | حلويات فاخرة",
    template: "%s | BRIVIA",
  },
  description: "BRIVIA — حلويات فاخرة وحرفية. اطلب الآن عبر واتساب. تشكيلة مميزة من الشوكولاتة والعلب والهدايا الفاخرة في سوريا.",
  keywords: ["حلويات", "شوكولاتة", "هدايا", "علب", "سوريا", "حلويات فاخرة", "BRIڤيا", "BRIVIA", "confectionery", "luxury chocolate"],
  authors: [{ name: "BRIVIA" }],
  creator: "BRIVIA",
  publisher: "BRIVIA Premium Confectionery",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    siteName: "BRIVIA",
    title: "BRIVIA | حلويات فاخرة",
    description: "تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة",
    images: [
      {
        url: `${SITE_URL}/brand/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BRIVIA - Premium Confectionery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BRIVIA | حلويات فاخرة",
    description: "تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة",
    images: [`${SITE_URL}/brand/og-image.jpg`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0b1a3d",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "BRIVIA - حلويات فاخرة",
  description: "تجربة حلوى استثنائية — من الشوكولاتة الحرفية إلى علب الهدايا الفاخرة",
  url: SITE_URL,
  telephone: "+963-995-939-432",
  image: `${SITE_URL}/brand/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "SY",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
  sameAs: [
    "https://www.instagram.com/brivia",
    "https://wa.me/963995939432",
  ],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable} ${tajawal.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen antialiased font-[family-name:var(--font-tajawal)] bg-cream text-navy">
        <FloatingCandies />
        {children}
      </body>
    </html>
  );
}
