import "./globals.css";
import type { Metadata } from "next";
import { clsx } from "clsx";
import { notoSans } from "@puppy-ti/lib/constraints/fonts";

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
      <body className={clsx([notoSans, "wrap"])}>{children}</body>
    </html>
  );
}
