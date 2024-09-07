import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

export const metadata = {
  title: "Report Child abuse",
  description: "A safe, child-friendly platform for young individuals to report child abuse. Empowering children with a voice to seek help and protection confidentially.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
