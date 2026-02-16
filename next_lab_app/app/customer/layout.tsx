import type { Metadata } from "next";

// Metadata for All Pages under this layout
export const metadata: Metadata = {
  title: "Customer Layout",
  description: "Layout for all customer related pages",
};

// Global Layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div>
            {/*
                This header will be common for all pages under /customer
            */}
            <h2 style={{ "backgroundColor": "#0e1b64", "padding": "1rem" }}>
                Customer Layout Header
            </h2>
        </div>
        {children}
    </>
  );
}
