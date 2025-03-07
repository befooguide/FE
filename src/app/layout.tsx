import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "./ThemeProviderWrapper";
import NavBar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "befoo",
  description: "베푸",
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
    <html lang="en">
      <body>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
      </body>
    </html>
  );
}
