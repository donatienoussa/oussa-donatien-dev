"use client";

import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { services } from "@/data";
import { Title } from "./ui/Title";
import { Quote } from "./Quote";

export function Services() {
  return (
    <div id="services" className="py-5">
      
      <Title title="2. Mes Services" />
      <Quote
        quote={"« La qualité d’un service se mesure à ce que l’on fait quand personne ne regarde. »"}
        author={"— Henry Ford"}
      />
      
      <div className="grid grid-cols-1 md:p-20 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services
          .map(service => (
            <BackgroundGradient
              key={service.id}
              className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
            >
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                {service.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {service.shortDescription}
              </p>
              <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <a>Mes</a>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  Services
                </span>
              </button>
            </BackgroundGradient>
          ))}
      </div>
    </div>
    
  );
}
