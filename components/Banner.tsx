import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imagePosition?: 'left' | 'right';
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
  imagePosition = 'right',
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-petgreen-50 to-petgreen-100 my-16 rounded-xl">
      <div
        className={`container mx-auto px-4 py-12 flex flex-col ${
          imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center`}
      >
        <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left md:pr-8 md:pl-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{title}</h2>
          <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-md mx-auto md:mx-0">{subtitle}</p>
          <Link href={buttonLink}>
            <Button className="bg-petgreen-600 hover:bg-petgreen-700 text-white px-8 py-2">
              {buttonText}
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-petgreen-200 rounded-full opacity-50 z-0"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-petgreen-200 rounded-full opacity-50 z-0"></div>
    </div>
  );
};

export default Banner;
