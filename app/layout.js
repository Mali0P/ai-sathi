import localFont from "next/font/local";
import "./globals.css";

const wolfFont = localFont({
  src: "./fonts/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2", // relative path inside project
  variable: "--font-wolf",
  display: "swap",
});

export const metadata = {
  title: "AI Sathi",
  description: "An AI companion to assist you in various tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={wolfFont.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
