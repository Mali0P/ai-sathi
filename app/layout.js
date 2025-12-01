import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";

const wolfFont = localFont({
  src: "./fonts/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2",
  variable: "--font-wolf",
  display: "swap",
});

export const metadata = {
  title: "AI Sathi",
  description: "Your AI companion",
};

export default function RootLayout({ children, router }) {
  return (
    <html lang="en" className={wolfFont.variable}>
      <body className="antialiased">
  <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
