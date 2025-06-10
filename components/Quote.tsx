"use client";

import { TextGenerateEffect } from "./ui/TextGenerateEffect";



export function Quote({quote, author}:{quote:string, author: string}) {
    return (
        <>
            <TextGenerateEffect className="md:text-5xl text-3xl text-shadow-2xs text-center px-5" words={quote} />
            <TextGenerateEffect className="text-2xl text-center px-3" words={author} />
        </>
    )
}
