"use client";

import { TextGenerateEffect } from "./ui/TextGenerateEffect";



export function Quote({quote, author}:{quote:string, author: string}) {
    return (
        <>
            <TextGenerateEffect className="text-5xl text-shadow-2xs text-center px-5" words={quote} />;
            <TextGenerateEffect className="text-5xl text-center px-5" words={author} />
        </>
    )
}
