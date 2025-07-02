import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import TopHeader from "@/components/top";
import WhatsAppButton from "@/components/WhatsAppButton"; // 👈 Import here

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZeenMart",
  description: "Your One-Stop Shop for your Pets",
  icons: {
    icon: "/favicon.png", // 👈 Favicon path here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProductProvider>
          <CartProvider>
            <TopHeader />
            <Navbar />
            {children}
            <WhatsAppButton /> {/* 👈 Add button inside providers */}
          </CartProvider>
        </ProductProvider>
        <Footer />
      </body>
    </html>
  );
}
