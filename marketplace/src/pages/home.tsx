import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IconBolt, IconShare2 } from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Input } from "@/components/ui/input";
import Infocard from "@/components/ui/Infocard";
import Smcarosel from "@/components/ui/Smcarosel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";

const Subscribepage = () => {
  const { toast } = useToast();
  const emailSchema = z.string().email();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    try {
      emailSchema.parse(e.target.value);
      setIsValidEmail(true);
    } catch (error) {
      setIsValidEmail(false);
    } finally {
      if (e.target.value == "") {
        setIsValidEmail(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
    } catch (error) {
      setEmail("");
      toast({
        variant: "destructive",
        title: "Wrong Email address",
        description: "Please Enter a valid email address.",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        {
          email,
        }
      );

      if (response.status == 200) {
        toast({
          variant: "success",
          title: response.data.message,
          description: "Thank you for subscribing to the newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Occurred",
        description: "Some error occurred due to please try again later.",
      });
      console.log(error);
    } finally {
      setEmail("");
    }
  };

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
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={` ${isValidEmail ? "" : "border-red-500"} `}
          />
          <Button
            type="submit"
            size="sm"
            onClick={handleSubmit}
            className=" cursor-pointer"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

const Nftlearn = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleList = async () => {
      try {
        const response = await axios.get("/articles/articlelist.json");
        if (response.status != 200) {
          throw new Error("Failed to fetch data");
        }
        setArticleList(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article list:", error);
        setIsLoading(false);
      }
    };

    fetchArticleList();
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <Smcarosel
          arr={articleList}
          Card={Infocard}
          title="NFT 101"
        ></Smcarosel>
      )}
    </>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
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
          <Button onClick={() => navigate("/explore")}>
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
  return (
    <div className="pt-[60px] font-inter">
      <HeroSection />
      <Carosel />
      <Nftlearn />
      <Subscribepage />
    </div>
  );
};

export default Home;
