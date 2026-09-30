import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrairieLearn — Assessment that teaches",
  description: "A product-led concept for PrairieLearn, the open-source online assessment and learning system.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
