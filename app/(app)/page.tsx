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
    <div className="relative z-0">
      {/* Grille en arrière-plan */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:80px_100px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#141111FF_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        <div className="absolute inset-0 bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      
      
      
      {/* Contenu principal */}
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
