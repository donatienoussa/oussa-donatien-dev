import React from 'react'

type Props = {
    title: string, 
    icon: React.ReactNode, 
    position: string,
    handleClick?: () => void, 
    otherStyles?: string
}

export const MagicButton = ({title, icon, position, handleClick, otherStyles}: Props) => {

    return (
        <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none md:w-60 md:mt-10"
            onClick={handleClick}
        >
             <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium gap-2 text-white backdrop-blur-3xl ${otherStyles}`}>
                {position === 'left' && icon}
                {title}
                {position === 'right' && icon}
            </span>
        </button>
  )
}
