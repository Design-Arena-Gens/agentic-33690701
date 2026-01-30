import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgenticHelper — Minecraft плагин",
  description:
    "AgenticHelper добавляет приветствие игроков и команду /agentgift для ежедневных подарков на сервер Paper/Spigot.",
  openGraph: {
    title: "AgenticHelper — тёплое приветствие и подарки",
    description:
      "Установите плагин на сервер и встречайте игроков персональными сообщениями и бонусами.",
    url: "https://agentic-33690701.vercel.app",
    siteName: "AgenticHelper",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
