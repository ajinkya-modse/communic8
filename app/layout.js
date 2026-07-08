import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Communic8 | Marketing & GTM Process for Indian Manufacturing MSMEs",
  description: "Communic8 helps Indian manufacturing MSMEs stay consistent in their growth journey by installing defined marketing and GTM processes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
