import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";
import { themeCss } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Metadados gerados a partir da identidade dinâmica — título, descrição,
 * favicon e Open Graph seguem o que estiver em site_settings.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const base = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    metadataBase: base ? new URL(base) : undefined,
    title: {
      default: `${settings.name}${settings.tagline ? ` — ${settings.tagline}` : ""}`,
      template: `%s · ${settings.name}`,
    },
    description: settings.description,
    icons: { icon: settings.faviconUrl },
    openGraph: {
      title: settings.name,
      description: settings.description,
      siteName: settings.name,
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#1554c7",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        {/* Tema injetado em runtime: trocar cores nos settings reflete sem rebuild. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss(settings) }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
