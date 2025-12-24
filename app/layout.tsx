import type { Metadata } from "next";
import { Geist, Geist_Mono, Cedarville_Cursive } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cedarvilleCursive = Cedarville_Cursive({
  variable: "--font-cedarville",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naughty or Nice?",
  description: "Connect your GitHub to see if you deserve coal or code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cedarvilleCursive.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
