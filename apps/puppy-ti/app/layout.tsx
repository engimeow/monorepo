import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./providers/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "퍼피티아이",
  description: "강아지의 MBTI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
