"use client";

import Image from 'next/image';
import { MotionTransition } from './transition-component';

const AvatarPortfolio = () => {
    return (
        <MotionTransition 
            position='bottom' 
            className="hidden md:block fixed bottom-0 left-0 z-[100] pointer-events-none"
        >
            <Image 
                src="/avatar.png" 
                width={400} 
                height={400} 
                className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-contain drop-shadow-2xl opacity-90" 
                alt="Portfolio Avatar"
                priority
            />
        </MotionTransition>
    );
}

export default AvatarPortfolio;
