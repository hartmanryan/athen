import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nCino Mortgage to Thanks.io Webhook Bridge",
  description: "Serverless bridge linking nCino Mortgage milestone events to Thanks.io print mailing lists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
