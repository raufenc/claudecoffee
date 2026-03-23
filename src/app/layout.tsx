import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "Claude Coffee — Premium Kahve Dünyası",
    template: "%s | Claude Coffee",
  },
  description: "Claude Coffee ile premium kahve çekirdeklerinden, özel ekipmanlara kadar her şeyi keşfedin. Türkiye'nin en güvenilir kahve e-ticaret platformu.",
  keywords: ["kahve", "premium kahve", "espresso", "pour over", "claude coffee"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://claudecoffee.vercel.app",
    siteName: "Claude Coffee",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
