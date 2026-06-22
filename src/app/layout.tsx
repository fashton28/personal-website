import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import { GlobalCommand } from "@/components/global-command";
import { HeaderControls } from "@/components/header-controls";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap"
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Fabian Ashton",
  description: "deeply excited for the future of technology"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();"
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {children}
        <HeaderControls />
        <GlobalCommand />
      </body>
    </html>
  );
}
