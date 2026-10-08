import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Noto_Sans_Thai,
  Fraunces,
  Noto_Serif_Thai,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";
import { getCurrentUser } from "@/lib/auth";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thailand Smart Travel Assistant",
  description: "Your AI-powered travel assistant for exploring Thailand.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${notoThai.variable} ${fraunces.variable} ${notoSerifThai.variable} antialiased`}
      >
        <HideOnAdmin>
          <Navbar user={user} />
        </HideOnAdmin>

        {children}

        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
      </body>
    </html>
  );
}
