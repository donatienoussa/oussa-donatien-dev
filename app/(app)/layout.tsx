import { Header } from "@/components/Header";
import Footer from "@/components/Footer";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    return (
        <main className="relative bg-black flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
            <div className="max-w-7xl w-full">
              <Header />
              {children}
              <Footer />
            </div>
        </main>    
    );
}
