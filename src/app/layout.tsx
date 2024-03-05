import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/themeProvider";
import Navbar from "@/components/ui/navbar";
import { flags } from "@/lib/flags";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Zenrich",
  title: "Zenrich",
  description: "An app meant to increase productivity.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zenrich",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Zenrich",
    title: {
      default: "Zenrich",
      template: "%s | Zenrich",
    },
    description: "An app meant to increase productivity.",
  },
  twitter: {
    card: "summary",
    title: {
      default: "Zenrich",
      template: "%s | Zenrich",
    },
    description: "An app meant to increase productivity.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={flags.defaultTheme}
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
