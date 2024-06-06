import { Button } from "@/components/ui/button";
import { IconBolt, IconShare2 } from "@tabler/icons-react";

const Home = () => {
  return (
    <div className="flex p-16 justify-center w-full gap-10 flex-wrap-reverse md:flex-nowrap">
      <div className="flex flex-col gap-4 justify-center min-[320px]:text-center md:text-left min-[320px]:items-center md:items-start">
        <div className="font-bold min-[320px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Discover & own unique digital assets on our NFT MarketPlace
        </div>
        <div className="text-[#808080] text-sm ">
          Explore a world of Digital art, Collectibles, and more on our modern
          Platform
        </div>
        <div className="flex gap-4 pt-2 justify-center">
          <Button>
            <IconBolt className="mr-2 h-4 w-4" />
            Explore Now
          </Button>
          <Button variant="outline">
            Learn More <IconShare2 className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex relative justify-center items-center">
        <div className="absolute bg-[#f534ff] top-[25%] left-[50%] w-1/3 h-1/3 rounded-xl blur-[128px] opacity-55 z-[-2]"></div>
        <div className="absolute bg-[#2fe3ff] top-[40%] right-[60%] w-1/2 h-1/2 rounded-xl blur-[128px] opacity-25 z-[-2]"></div>
        <img
          src="/images/hero-section-shop.png"
          className="w-11/12 h-auto"
        ></img>
      </div>
    </div>
  );
};

export default Home;
