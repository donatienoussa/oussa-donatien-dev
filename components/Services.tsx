"use client";

import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { Title } from "./ui/Title";
import { Quote } from "./Quote";
import { useAppwrite } from "@/hooks/useAppwrite";
import { fetchServices } from "@/lib/actions/services";
import { ServicesSheet } from "./ui/ServicesSheet";

export function Services() {

  const { data: services, loading } = useAppwrite({
    fn: fetchServices
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Chargement des services...</p>
      </div>
    );
  }

  if (!services) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Aucun service disponible</p>
      </div>
    );
  }

  return (
    <div id="services" className="py-15">

      <Title title={`2. Mes  services`} />
      <Quote
        quote={"« La qualité d’un service se mesure à ce que l’on fait quand personne ne regarde. »"}
        author={"— Henry Ford"}
      />

      <div className="z-100 grid grid-cols-1 md:p-20 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services
          .map((service, index) => (
            <BackgroundGradient
              key={service.id ?? index}
              className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
            >
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                {service.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {service.shortDescription}
              </p>
              <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <a>@</a>
                <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                  {service.type}
                </span>
              </button>
            </BackgroundGradient>
          ))}
      </div>
       <div className="flex items-center justify-end mt-5 mr:5 md:mr-20 ">
          <ServicesSheet />
        </div>
    </div>

  );
}
