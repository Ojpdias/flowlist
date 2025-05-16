import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Carrega fontes como variáveis CSS
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Metadados do projeto
export const metadata: Metadata = {
  title: "Flowlist",
  description: "Crie playlists com seu estilo",
};

// Layout global
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-950 text-white antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
