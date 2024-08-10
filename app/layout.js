import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Pal",
  description: "Pantry Pal Application used for managing pantry",
  icons: {
    icon: "public/th.jpg", // This will automatically set the favicon
  },
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
