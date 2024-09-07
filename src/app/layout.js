import NavbarComponent from "@/components/Navbar";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Report Child abuse",
  description: "A safe, child-friendly platform for young individuals to report child abuse. Empowering children with a voice to seek help and protection confidentially.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen">
        <NextUIProvider className="flex flex-col min-h-screen">
          <NavbarComponent />
          <main className="flex-grow m-24">
            {children}
          </main>
          <Footer/>
        </NextUIProvider>
      </body>
    </html>
  );
}