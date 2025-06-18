"use client"


import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import About from "@/components/About";
import { Services } from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { cn } from "@/lib/utils";

export default function Home() {
  
  return (
    <div>     
      {/** La grille */}
      <div
        className="fixed top-0 left-0 flex h-screen w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:80px_100px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#141111FF_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div> 
      
      <Hero />
      <About />
      <Services />
      <RecentProjects />
      <Testimonials />
      <Experience />
      <Approach />
    </div>
  );
}