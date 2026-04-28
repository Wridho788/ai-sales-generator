import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
