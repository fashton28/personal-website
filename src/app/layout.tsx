import type { Metadata } from "next";
import { EB_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";

import { GlobalCommand } from "@/components/global-command";
import { HeaderControls } from "@/components/header-controls";
import { getAllPostsMeta } from "@/lib/posts";
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

// Display serif for the menu curtain; ships a true italic for the hover state.
const serif = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "fashton",
  description: "deeply excited for the future of technology"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPostsMeta();
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
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}>
        {children}
        <HeaderControls />
        <GlobalCommand posts={posts} />
      </body>
    </html>
  );
}
