import "./globals.css";
import type { Metadata } from "next";
import { Gugi, Inter } from "next/font/google";
import { AuthProvider } from "./providers/authProvider";

const gugi = Gugi({
  subsets: ["latin"],
  weight: "400",
});

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
      <body className={gugi.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
