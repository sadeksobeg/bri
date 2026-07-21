import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://brivia-syria.com"),
  title: {
    default: "BRIVIA | حلويات فاخرة",
    template: "%s | BRIVIA",
  },
  description: "BRIVIA — حلويات فاخرة وحرفية. اطلب الآن عبر واتساب. تشكيلة مميزة من الشوكولاتة والعلب والهدايا الفاخرة في سوريا.",
  keywords: ["حلويات", "شوكولاتة", "هدايا", "علب", "سوريا", "حلويات فاخرة", "بريڤيا", "BRIVIA", "confectionery", "luxury chocolate"],
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
        url: "/brand/og-image.jpg",
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
    images: ["/brand/og-image.jpg"],
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
      </head>
      <body className="min-h-screen antialiased font-[family-name:var(--font-tajawal)] bg-cream text-navy">
        {children}
      </body>
    </html>
  );
}
