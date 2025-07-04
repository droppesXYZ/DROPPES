import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/layout/AuthProvider";
import { AdminSetup } from "@/components/layout/AdminSetup";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Droppes",
  description: "Gerencie seus airdrops de forma fácil e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head />
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <StackProvider app={stackServerApp}>
            <StackTheme>
              {/* Logo Central Global - Atravessa toda a página */}
              <div className="central-logo-global">
                <Image
                  src="/droppes.png"
                  alt="Droppes Logo Background"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain object-center"
                  priority
                />
              </div>
              
              <AuthProvider>
                <AdminSetup />
                <Header />
                <main>{children}</main>
              </AuthProvider>
            </StackTheme>
          </StackProvider>
        </Suspense>
      </body>
    </html>
  );
}
