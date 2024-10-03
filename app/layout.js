import localFont from "next/font/local";
import "./globals.css";
import LenisSmooth from "./components/LenisSmooth";

const tomatoGrotesk = localFont({
  src: [
    {
      path: "./fonts/TomatoGrotesk-Regular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/TomatoGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/TomatoGrotesk-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/TomatoGrotesk-ExtraBold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tomato-grotesk",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${tomatoGrotesk.variable} antialiased`}>
        <LenisSmooth />
        {children}
      </body>
    </html>
  );
}
