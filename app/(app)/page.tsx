"use client"


import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import About from "@/components/About";
import { Services } from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  
  return (
    <>
      <Hero />
      <About />
      <Services />
      <RecentProjects />
      <Testimonials />
      <Experience />
      <Approach />
    </>
  );
}