"use client";

import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: {
    items: Testimonial[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            const children = Array.from(scrollerRef.current.children);
            children.forEach((item) => {
                const clone = item.cloneNode(true);
                scrollerRef.current?.appendChild(clone);
            });
            setDirection();
            setSpeed();
            setStart(true);
        }
    });

    const setDirection = () => {
        containerRef.current?.style.setProperty(
            "--animation-direction",
            direction === "left" ? "forwards" : "reverse"
        );
    };

    const setSpeed = () => {
        const duration =
            speed === "fast" ? "15s" : speed === "normal" ? "150s" : "10s";
        containerRef.current?.style.setProperty("--animation-duration", duration);
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 w-screen overflow-hidden",
                "[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 gap-8 py-4",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className={cn(
                            "relative w-[350px] md:w-[450px] shrink-0 rounded-2xl px-8 py-6 border shadow-md transition-all",
                            "backdrop-blur-md bg-white/30 dark:bg-zinc-900/30",
                            "border-zinc-200 dark:border-zinc-700",
                            "text-neutral-900 dark:text-neutral-100"
                        )}
                    >
                        <blockquote>
                            <span className="block text-sm leading-relaxed font-normal">
                                {item.quote}
                            </span>
                            <div className="mt-6">
                                <span className="block text-sm font-bold text-blue-800">
                                    {item.name}
                                </span>
                                <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    {item.title}
                                </span>
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
