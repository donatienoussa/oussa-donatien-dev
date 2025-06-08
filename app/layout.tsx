import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";


export const metadata: Metadata = {
  title: "Donatien's Portfolio",
  description: "Mobile Apps developper",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <UserProvider>
          {children}   
        </UserProvider>
      </body>
    </html>
  );
}
