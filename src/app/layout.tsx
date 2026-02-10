import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Le Tandem | Bistrot-Resto à Embrun",
    template: "%s | Le Tandem",
  },
  description:
    "Le Tandem, bistrot-resto à Embrun dans les Hautes-Alpes. Découvrez notre carte, nos événements et laissez-nous un message dans notre livre d'or.",
  openGraph: {
    title: "Le Tandem | Bistrot-Resto à Embrun",
    description:
      "Bistrot-resto au cœur d'Embrun. Découvrez notre carte, nos événements et notre ambiance chaleureuse.",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
      { url: "/images/favicon-tandem-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${lora.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
