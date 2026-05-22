import { Plus_Jakarta_Sans, Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import ThirdPartyScripts from "./components/ThirdPartyScripts";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", 
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "International Schooling Europe | Best Accredited American Online School",
  description: "Experience world-class KG-12 American online schooling in Europe. Fully accredited by NEASC, WASC, and Cognia. Flexible, high-quality, and future-ready education from anywhere.",
  metadataBase: new URL("https://europe-test.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <ThirdPartyScripts />
      </head>
      <body className="min-h-full flex flex-col bg-white font-[family-name:var(--font-body)]">
        {children}
        <Toaster />      </body>
    </html>
  );
}
