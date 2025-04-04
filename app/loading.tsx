import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-Main text-Main dark:text-white">
      <div className="text-3xl font-semibold animate-pulse">
        <div className="flex flex-col space-y-10 items-center">
          {/* Spinning Favicon */}
          <Image
            src="/favicon.jpg"
            alt="Loading"
            className="w-24 h-24 object-contain animate-spin rounded-full"
            priority
            width={300}
            height={300}
          />
          <h1 className="text-3xl md:text-6xl">Loading...</h1>
          <div className="flex items-center justify-center gap-5 md:gap-10">
            <div className="size-10 bg-Main dark:bg-white rounded-full animate-bounce animation-delay-200ms"></div>
            <div className="size-10 bg-Main dark:bg-white rounded-full animate-bounce animation-delay-400ms"></div>
            <div className="size-10 bg-Main dark:bg-white rounded-full animate-bounce animation-delay-400ms"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
