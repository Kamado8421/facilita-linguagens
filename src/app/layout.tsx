import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../contexts/UserContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "Facilita Linguagens",
  description: "Plataforma de auxílio pra língua portuguesa em vestibulares.",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br" className="h-screen w-screen">
      
      <body className={`${poppins.variable} antialiased h-full w-full`}>
        <SessionProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
