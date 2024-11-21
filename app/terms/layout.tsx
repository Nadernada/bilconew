import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const montserratSans = localFont({
  src: "../fonts/Montserrat-SemiBold.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const urdwinBoldMono = localFont({
  src: "../fonts/URWDINCond-Bold.ttf",
  variable: "--font-geist-mono",
  weight: "700",
});
const gothamMono = localFont({
  src: "../fonts/Gotham-Medium.otf",
  variable: "--font-geist-mono",
  weight: "700",
});


export const metadata: Metadata = {
  title: "Bilco",
  description: "Bilco landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
      />

      </head>

      <body
        className={`${gothamMono.className} ${montserratSans.variable} ${urdwinBoldMono.variable} antialiased`}
      >
        {children}
         {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
         {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/js.js"></script>
      </body>
    </html>
  );
}
