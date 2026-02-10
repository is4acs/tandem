import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
