import Image from "next/image";
import { MotionTransition } from "./transition-component";

const AvatarServices = () => {
    return (
        <MotionTransition 
            position='right' 
            className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-[100] pointer-events-none"
        >
            <Image 
                src="/services.png" 
                width="300" 
                height="300" 
                className="w-[250px] h-[250px] xl:w-[300px] xl:h-[300px] object-contain drop-shadow-2xl" 
                alt="Services Avatar"
                priority
            />
        </MotionTransition>
    );
}

export default AvatarServices;
