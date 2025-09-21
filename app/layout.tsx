import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import TopHeader from "@/components/top";
import WhatsAppButton from "@/components/WhatsAppButton";

// Optimized font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  preload: true,
});

// ✅ Move themeColor to viewport export
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: " ZeenMart | One-Stop Pet Food Store in the USA",
  description:
    "ZeenMart offers premium quality pet food, accessories, and supplies with fast delivery and trusted service in USA.",
  keywords: [
    "ZeenMart",
    "pet store",
    "online pet shop",
    "pet food",
    "pet accessories",
    "pet care",
  ],
  authors: [{ name: "ZeenMart Team" }],
  metadataBase: new URL("https://www.zeenmart.com"),
  openGraph: {
    title: "ZeenMart – Your One-Stop Shop for Your Pets",
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
    title: "ZeenMart – Your One-Stop Shop for Your Pets",
    description:
      "Explore premium quality pet food, accessories, and supplies at ZeenMart.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://www.zeenmart.com",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TJR5GCW4');`,
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SNL4ZBMNFW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SNL4ZBMNFW', {
              page_path: window.location.pathname,
              transport_type: 'beacon',
              anonymize_ip: true
            });
            gtag('config', 'AW-17349796191');
          `}
        </Script>

        {/* ✅ Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1056173783068344');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* GTM noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJR5GCW4"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* ✅ Meta Pixel noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1056173783068344&ev=PageView&noscript=1"/>
            `,
          }}
        />

        {/* App Structure */}
        <ProductProvider>
          <CartProvider>
            <TopHeader />
            <Navbar />
            <main id="main-content" className="min-h-[calc(100vh-320px)]">
              {children}
            </main>
            <WhatsAppButton />
          </CartProvider>
        </ProductProvider>
        <Footer />

        {/* Lazy load non-critical scripts */}
        <Script
          src="https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min.js"
          strategy="lazyOnload"
        />
        <Script id="lazy-load-images" strategy="lazyOnload">
          {`
            document.addEventListener('DOMContentLoaded', function() {
              const observer = lozad('.lazy', {
                rootMargin: '200px 0px',
                threshold: 0.1,
                loaded: function(el) {
                  el.classList.add('loaded');
                }
              });
              observer.observe();
            });
          `}
        </Script>
      </body>
    </html>
  );
}
