import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CarButtonProps {
  image: string | StaticImageData;
  link: string;
}

const CarButton: React.FC<CarButtonProps> = ({ image, link }) => {
  return (
    <Link href={link} passHref>
      <div className="size-16 flex justify-center items-center rounded-xl shadow-lg bg-Main dark:bg-white hover:scale-110 transition-all duration-200">
        <Image src={image} alt="Car Icon" width={40} height={40}/>
      </div>
    </Link>
  );
};

export default CarButton;
