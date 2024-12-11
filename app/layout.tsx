import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Bilco Professional Line: Custom-Colored Concrete Bricks",
  description: "Discover Bilco's new Professional Line. Create custom concrete bricks colored to the core in any hue—green, purple, red or other unique shades. Perfect for personalized commercial projects with exceptional durability.",
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

<meta property="og:title" content="Bilco Professional Line: Custom-Colored Concrete Bricks"/>
    <meta property="og:image" content="./images/OG-image.png"/>
    <meta property="og:site_name" content="Bilco Brick"/>
    <meta property="og:description"
          content="Discover Bilco's new Professional Line. Create custom concrete bricks colored to the core in any hue—green, purple, red or other unique shades. Perfect for personalized commercial projects with exceptional durability."/>

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
