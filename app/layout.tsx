import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import TopHeader from "@/components/top";
import WhatsAppButton from "@/components/WhatsAppButton";

// ✅ Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "ZeenMart – Your One‑Stop Shop for Your Pets",
  description:
    "ZeenMart offers premium quality pet food, accessories, and supplies with fast delivery and trusted service.",
  keywords: [
    "ZeenMart",
    "pet store",
    "online pet shop",
    "pet food",
    "pet accessories",
    "pet care",
  ],
  authors: [{ name: "ZeenMart Team" }],
  openGraph: {
    title: "ZeenMart – Your One‑Stop Shop for Your Pets",
    description:
      "Find everything your pets need in one place. Quality products, fast shipping, and trusted service.",
    url: "https://www.zeenmart.com",
    siteName: "ZeenMart",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZeenMart – Premium Pet Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeenMart – Your One‑Stop Shop for Your Pets",
    description:
      "Explore premium quality pet food, accessories, and supplies at ZeenMart.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://www.zeenmart.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager Script */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TJR5GCW4');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Google Tag Manager noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJR5GCW4"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* ✅ App Content */}
        <ProductProvider>
          <CartProvider>
            <TopHeader />
            <Navbar />
            {children}
            <WhatsAppButton />
          </CartProvider>
        </ProductProvider>
        <Footer />
      </body>
    </html>
  );
}

