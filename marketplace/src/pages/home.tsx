import { Button } from "@/components/ui/button";
import {
  IconBolt,
  IconShare2,
  IconArrowRight,
  IconCurrencyEthereum,
} from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Input } from "@/components/ui/input";
import Nftcard from "@/components/ui/Nftcard";
import Infocard from "@/components/ui/Infocard";
import Smcarosel from "@/components/ui/Smcarosel";

const Subscribepage = () => {
  return (
    <div className="flex pt-12 p-8 justify-between items-center w-full max-[640px]:p-4 max-[640px]:pt-12 pb-0 max-sm:justify-center">
      <div className="flex relative justify-center items-center max-w-[45%] max-sm:hidden">
        <div className="absolute bg-[#f0770f] bottom-0 left-[25%] w-1/3 h-1/3 rounded-xl blur-[108px] opacity-95 z-[-2]"></div>
        <img src="/images/hero-section/Subscribe/Subscribe.png" />
      </div>
      <div className="flex flex-col lg:gap-6 gap-2 max-sm:text-center max-sm:items-center">
        <div className="font-bold sm:text-2xl md:text-4xl lg:text-5xl">
          Subscribe to get fresh news & updates about{" "}
          <span className="text-[#f0770f]">NFTs</span>
        </div>
        <div className="lg:font-semibold text-[8px] sm:text-sm lg:text-md  text-[#808080]">
          Get exclusive insights, updates, and fresh content delivered straight
          to your inbox. Stay ahead of the curve with Apolio!
        </div>
        <div className="flex max-w-[75%] items-center gap-2 ">
          <Input type="email" placeholder="Email" />
          <Button type="submit" size="sm">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

const CardGrid = () => {
  const arr = [
    {
      creator: "hansi flick",
      title: "Sakura Special Edition",
      src: "/images/hero-section/Latest/latest-01.jpg",
      price: "0.59",
    },
    {
      creator: "hansi flick",
      title: "Bored Ape",
      src: "/images/hero-section/Latest/latest-02.webp",
      price: "0.12",
    },
    {
      creator: "Beanz",
      title: "Red Bubble",
      src: "/images/hero-section/Latest/latest-03.jpg",
      price: "0.02",
    },
    {
      creator: "ramesh",
      title: "Vee Con Ticket",
      src: "/images/hero-section/Latest/latest-04.png",
      price: "0.38",
    },
    {
      creator: "Overworld",
      title: "Electro",
      src: "/images/hero-section/Latest/latest-05.png",
      price: "0.75",
    },
    {
      creator: "Kartik",
      title: "Hape Social",
      src: "/images/hero-section/Latest/latest-06.jpg",
      price: "1.12",
    },
  ];

  return (
    <div className="flex w-full p-4 justify-center items-center">
      <Card>
        <CardContent className="p-12 pb-6 max-[640px]:p-6 max-[640px]:pb-3">
          <div className="text-4xl font-bold pb-4">Latest Drops</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-6 ">
            {arr.map((val, index) => (
              <Nftcard val={val} indx={index} />
            ))}
          </div>
          <Button variant="outline" className="w-full mt-6">
            View All
            <IconArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const HeroSection = () => {
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
          src="/images/hero-section/hero-section-shop.png"
          className="w-11/12 h-auto"
        ></img>
      </div>
    </div>
  );
};

const Carosel = () => {
  const arr = [
    {
      src: "/images/hero-section/Banner/featured-hape.jpg",
      heading: "Bored Ape new Collection",
      isvid: false,
    },
    {
      src: "/images/hero-section/Banner/featured-azuki.jpg",
      heading: "Buy Azuki",
      isvid: false,
    },
    {
      src: "/images/hero-section/Banner/featured-beanz.jpg_large",
      heading: "All time top seller Beanz",
      isvid: false,
    },
    {
      src: "/images/hero-section/Banner/featured-overworld.jpg",
      heading: "Overworld Incarna",
      isvid: false,
    },
  ];

  return (
    <div className="flex py-12 justify-center w-full">
      <Carousel
        className="w-11/12 px-4"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {arr.map((val, index) => (
            <CarouselItem key={index}>
              <div>
                <Card className="border-none overflow-hidden">
                  <CardContent className="flex lg:h-[600px] h-[350px] max-[640px]:h-[200px] items-center justify-center p-0 relative overflow-hidden">
                    {val.isvid == false ? (
                      <img
                        src={val.src}
                        className="w-full h-full object-cover rounded-sm"
                      ></img>
                    ) : (
                      <video src={val.src} muted />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-black/0"></div>
                    <div className="flex flex-col gap-2 absolute bottom-[5%] left-1/2 translate-x-[-50%] z-2 text-center bg-opacity-50 backdrop-blur-lg border-[1px] py-2.5 px-8 max-[640px]:px-4 max-[640px]:py-2 rounded-full">
                      <span className="font-semibold text-md max-[640px]:text-[10px] max-[640px]:font-base">
                        {val.heading}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex w-full justify-end items-center mt-2 max-[640px]:mt-1">
          <div className="flex justify-center items-center py-1.5 px-2 bg-[#161616] rounded-full w-fit gap-2 ">
            <CarouselDots />
            <CarouselPrevious className="static translate-y-0 border-none  h-6 w-6 p-1.5 max-[640px]:h-5 max-[640px]:w-5 max-[640px]:p-1 " />
            <CarouselNext className="static translate-y-0 border-none h-6 w-6 p-1.5 max-[640px]:h-5 max-[640px]:w-5 max-[640px]:p-1" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

const Home = () => {
  const arr1 = [
    {
      src: "/images/Learn/Learn-01.png",
      title: "What is an NFT",
    },
    {
      src: "/images/Learn/Learn-02.png",
      title: "How to buy NFT",
    },
    {
      src: "/images/Learn/Learn-03.png",
      title: "How to sell NFT",
    },
    {
      src: "/images/Learn/Learn-04.png",
      title: "What is a Wallet",
    },
  ];

  const arr2 = [
    {
      creator: "hansi flick",
      title: "Sakura Special Edition",
      src: "/images/Azuki/NFT-02.jpg",
      price: "0.59",
    },
    {
      creator: "hansi flick",
      title: "Bored Ape",
      src: "/images/Azuki/NFT-03.jpg",
      price: "0.12",
    },
    {
      creator: "Beanz",
      title: "Red Bubble",
      src: "/images/Azuki/NFT-04.jpg",
      price: "0.02",
    },
    {
      creator: "ramesh",
      title: "Vee Con Ticket",
      src: "/images/Azuki/NFT-05.jpg",
      price: "0.38",
    },
    {
      creator: "Overworld",
      title: "Electro",
      src: "/images/Azuki/NFT-06.jpg",
      price: "0.75",
    },
    {
      creator: "Kartik",
      title: "Hape Social",
      src: "/images/Azuki/NFT-07.jpg",
      price: "1.12",
    },
  ];

  const arr3 = [
    {
      creator: "hansi flick",
      title: "Sakura Special Edition",
      src: "/images/Hape/NFT-01.jpg",
      price: "0.59",
    },
    {
      creator: "hansi flick",
      title: "Bored Ape",
      src: "/images/Hape/NFT-02.jpg",
      price: "0.12",
    },
    {
      creator: "Beanz",
      title: "Red Bubble",
      src: "/images/Hape/NFT-05.jpg",
      price: "0.02",
    },
    {
      creator: "ramesh",
      title: "Vee Con Ticket",
      src: "/images/Hape/NFT-07.jpg",
      price: "0.38",
    },
    {
      creator: "Overworld",
      title: "Electro",
      src: "/images/Hape/NFT-06.jpg",
      price: "0.75",
    },
    {
      creator: "Kartik",
      title: "Hape Social",
      src: "/images/Hape/NFT-08.jpg",
      price: "1.12",
    },
  ];

  return (
    <div className="pt-[60px] font-inter">
      <HeroSection />
      <Carosel />
      <CardGrid />
      <Smcarosel arr={arr2} Card={Nftcard} title="Azuki"></Smcarosel>
      <Smcarosel arr={arr3} Card={Nftcard} title="Hape Social"></Smcarosel>
      <Smcarosel arr={arr1} Card={Infocard} title="NFT 101"></Smcarosel>
      <Subscribepage />
    </div>
  );
};

export default Home;
