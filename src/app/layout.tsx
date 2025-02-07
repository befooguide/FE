import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "befoo",
  description: "베푸",
  // 로고 정해지면 주석 풀고 파비콘 추가
  // icons: {
  //   icon: "/logo_TapImg.png",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
