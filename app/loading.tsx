import Image from 'next/image';
import { Loader2 } from 'lucide-react'; // <-- 1. Import the loader icon

const Loading = () => {
    return (
        <div className="w-full h-full flex flex-col font-space-grotesk">
            <div className="flex-1 flex flex-col justify-center items-center h-[80vh]">
                <div className="relative size-40 flex justify-center items-center">
                    <Loader2 strokeWidth={1} className="absolute w-full h-full animate-spin text-subtext dark:text-Dark_subtext" />
                    <div className="relative w-20 h-20 animate-pulse">
                        {/* Light Mode Logo */}
                        <Image
                            src="/images/Logo_W.png"
                            alt="Loading..."
                            fill
                            className="object-contain dark:hidden"
                            sizes="80px"
                        />
                        {/* Dark Mode Logo */}
                        <Image
                            src="/images/Logo_B.png"
                            alt="Loading..."
                            fill
                            className="object-contain hidden dark:block"
                            sizes="80px"
                        />
                    </div>
                </div>

                {/* Text Below */}
                <h1 className="font-extrabold text-xl text-subtext dark:text-Dark_subtext mt-6">
                    Loading...
                </h1>
            </div>
        </div>
    );
};

export default Loading;