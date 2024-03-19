import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Navbar from "@/components/ui/navbar";
import { flags } from "@/lib/flags";
import { CookiesProvider } from "next-client-cookies/server";
import { SessionProvider } from "@/context/sessionContext";
import { validateRequest } from "@/lib/auth";
import { Toaster } from "sonner";

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
  const session = await validateRequest();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider value={session}>
          <CookiesProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme={flags.defaultTheme}
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </CookiesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
