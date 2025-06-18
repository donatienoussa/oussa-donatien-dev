"use client";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export function Title({ title }: { title: string }) {
    const words = title.split(" ").map((word, index, arr) => ({
        text: word,
        className: `
            ${index === arr.length - 1 ? "text-blue-600 dark:text-blue-400" : "text-black dark:text-white"}
            md:text-5xl text-2xl`
    }));

    return (
        <div className="flex flex-col items-center justify-center">
            <TypewriterEffectSmooth words={
                words
            } />
        </div>
    );
}
