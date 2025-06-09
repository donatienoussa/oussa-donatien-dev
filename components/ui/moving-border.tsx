'use client';

import React, {
    ElementType,
    ComponentPropsWithoutRef,
    ReactNode,
    useRef,
    useState,
    useEffect,
} from 'react';
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from 'motion/react';
import { cn } from '@/lib/utils';

type ButtonProps<T extends ElementType> = {
    as?: T;
    borderRadius?: string;
    children: ReactNode;
    containerClassName?: string;
    borderClassName?: string;
    duration?: number;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children'>;

export function Button<T extends ElementType = 'button'>({
    as,
    borderRadius = '1.75rem',
    children,
    containerClassName,
    borderClassName,
    duration,
    className,
    ...otherProps
}: ButtonProps<T>) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const Component = (as || 'button') as ElementType;

    return (
        <Component
            className={cn(
                'relative overflow-hidden bg-transparent p-[1px] text-xl',
                containerClassName
            )}
            style={{ borderRadius }}
            {...otherProps}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                {isClient && (
                    <MovingBorder duration={duration} rx="30%" ry="30%">
                        <div
                            className={cn(
                                'h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]',
                                borderClassName
                            )}
                        />
                    </MovingBorder>
                )}
            </div>

            <div
                className={cn(
                    'relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl',
                    className
                )}
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                {children}
            </div>
        </Component>
    );
}

interface MovingBorderProps extends React.SVGProps<SVGSVGElement> {
    children: ReactNode;
    duration?: number;
    rx?: string;
    ry?: string;
}

export const MovingBorder: React.FC<MovingBorderProps> = ({
    children,
    duration = 3000,
    rx,
    ry,
    ...svgProps
}) => {
    const pathRef = useRef<SVGRectElement | null>(null);
    const progress = useMotionValue(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength() ?? 0;
        const pxPerMs = length / duration;
        progress.set((time * pxPerMs) % length);
    });

    const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0);
    const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0);

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute h-full w-full"
            width="100%"
            height="100%"
            {...svgProps}
        >
            <rect
                fill="none"
                width="100%"
                height="100%"
                rx={rx}
                ry={ry}
                ref={pathRef}
            />
            <motion.g style={{ transform }}>{children}</motion.g>
        </svg>
    );
};
