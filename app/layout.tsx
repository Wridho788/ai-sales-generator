import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Sales Page Generator",
  description: "Generate high-converting landing pages instantly with AI",
  openGraph: {
    title: "AI Sales Page Generator",
    description: "Generate high-converting landing pages instantly with AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
