import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property Sell",
  description: "Buy or Sell properties easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={lato.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
