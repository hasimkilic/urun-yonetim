import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import styles from "@/styles/Main.module.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ürün Yönetim Paneli",
  description: "Ürün Yönetim Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <div className={styles.container}>
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
