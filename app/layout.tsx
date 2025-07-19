import type { Metadata } from "next";
import "../style/globals.css";
import { UserProvider } from "@/context/UserContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Donatien's Portfolio",
  description: "Apps developper",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html className="scroll-smooth" lang="fr" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              {children}
              <Toaster />
            </UserProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}