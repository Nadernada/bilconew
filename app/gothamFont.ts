import localFont from "next/font/local";

// export const gothamMono = localFont({
//   src: [
//     {
//       path: "./fonts/Gotham-Medium.otf",
//       weight: "500", // Medium
//       style: "normal",
//     },
//   ],
//   variable: "--font-gotham-mono",
// });
export const gothamMonoBook = localFont({
  src: [
    {
      path: "./fonts/Gotham-Book.woff",
      weight: "500", // Medium
      style: "normal",
    },
  ],
  variable: "--font-gotham-mono-book",
});
