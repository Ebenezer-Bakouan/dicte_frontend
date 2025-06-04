import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const inter = localFont({ src: '../public/fonts/Inter-Regular.woff2' });

export const metadata: Metadata = {
  title: "Dicte - Application de Dictée",
  description: "Application de dictée pour améliorer votre orthographe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
