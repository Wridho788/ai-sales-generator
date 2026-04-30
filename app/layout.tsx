import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SalesForge AI — Generate Landing Pages Instantly",
  description: "Create high-converting landing pages with AI in seconds. No design skills needed.",
  openGraph: {
    title: "SalesForge AI — Generate Landing Pages Instantly",
    description: "Create high-converting landing pages with AI in seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#374151",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              fontSize: "14px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}