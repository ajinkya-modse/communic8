import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Communic8 | Marketing & GTM Process for Indian Manufacturing MSMEs",
  description: "Communic8 helps Indian manufacturing MSMEs stay consistent in their growth journey by installing defined marketing and GTM processes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
