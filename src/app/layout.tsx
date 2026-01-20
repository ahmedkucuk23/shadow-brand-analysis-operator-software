import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadow Operator | Strategic Business Planning & Brand Analysis",
  description: "Transform your business with our comprehensive 14-day strategic planning and in-depth brand analysis tools. Start your journey to success today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
