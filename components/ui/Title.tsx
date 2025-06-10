"use client";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export function Title({ title }: { title: string }) {
    const words = title.split(" ").map((word, index, arr) => ({
        text: word,
        className: `${index === arr.length - 1 && "text-blue-500 dark:text-blue-500"} text-5xl `
            
    }));

    return (
        <div className="flex flex-col items-center justify-center">
            <TypewriterEffectSmooth words={words} />
        </div>
    );
}