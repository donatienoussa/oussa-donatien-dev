import React from 'react';

interface DeviceFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function DeviceFrame({ children, className }: DeviceFrameProps) {
    return (
        <div className={`relative w-[200px] aspect-[9/20] rounded-[2.5rem] border-[12px] border-black bg-gradient-to-br from-neutral-900 to-zinc-800 shadow-xl overflow-hidden ${className}`}>
            {children}

            {/* Capteur haut */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-zinc-700" />

            {/* Bouton latéral */}
            <div className="absolute right-[-4px] top-20 w-[6px] h-20 rounded-md bg-zinc-700" />
        </div>
    );
}
