import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";

// Metadata for a page
export const metadata: Metadata = {
  title: "Next Lab App",
  description: "Layout for all pages in the app",
};

// Global Layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Common header for all pages */}
        <Header /> 
        {children}
      </body>
    </html>
  );
}
