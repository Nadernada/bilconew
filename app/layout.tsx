import type { Metadata } from "next";
import "./globals.css";


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
        className="font-[Gotham-mid] antialiased"
      >
        {children}
         {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script defer src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </body>
    </html>
  );
}
