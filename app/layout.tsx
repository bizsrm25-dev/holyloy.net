import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/base.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holyloy.net"),
  title: {
    default: "HolyLoy - Loyalty is royalty",
    template: "%s | HolyLoy",
  },
  description:
    "A loyalty and rewards ecosystem connecting consumers, businesses and communities, and a portfolio of twelve ventures across Saudi Arabia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
