import Nftcard from "@/components/ui/Nftcard";
import { useListedNfts, useAccount, useNetwork } from "@/components/hooks/web3";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

const Nftonsale = ({ arr }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-8">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} isauth={false} />
      ))}
    </div>
  );
};

const Explore = () => {
  const { nfts } = useListedNfts();
  const { account } = useAccount();
  const { network } = useNetwork();
  const [isloading, setloading] = useState<boolean>(true);
  const [currstate, setcurrstate] = useState<number>(0);
  const navigate = useNavigate();

  const presetdata = [
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Hape/NFT-01.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Hape/NFT-02.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Hape/NFT-03.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Hape/NFT-04.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Hape/NFT-05.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Overworld/NFT-03.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Overworld/NFT-02.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Overworld/NFT-01.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Overworld/NFT-08.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
    {
      tokenId: 2,
      price: 0.04,
      creator: "0x4213p2343400",
      isListed: true,
      owner: "0xx2231p033",
      meta: {
        title: "Sasuke Special Edition",
        src: "/images/Overworld/NFT-06.jpg",
        skills: {
          type: "hape",
          background: "gra",
        },
      },
    },
  ];

  useEffect(() => {
    let timeoutId;
    const getcurrstate = () => {
      if (account.data != undefined && network.isSupported) {
        setcurrstate(2);
      } else if (account.data != undefined) {
        setcurrstate(1);
      } else {
        setcurrstate(0);
      }
      timeoutId = setTimeout(() => {
        setloading(false);
      }, 500);
    };
    getcurrstate();
    return () => {
      // Clear timeout on cleanup
      clearTimeout(timeoutId);
    };
  }, [network, account]);

  return isloading == true ? (
    <div className=" pt-28 font-inter">
      <Skeleton className="h-[50px] w-[200px] m-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-8">
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-[300px] w-[250px]" />
      </div>
    </div>
  ) : currstate == 2 ? (
    <div className=" pt-28 font-inter">
      <div className="text-4xl font-bold px-8 py-6">Explore</div>
      <Nftonsale arr={nfts.data} />
    </div>
  ) : currstate == 1 ? (
    <div className="flex justify-center items-center p-20 pt-28 font-inter">
      <Card className="m-12 mx-4">
        <CardContent className="p-8">
          <div className="font-bold text-4xl text-center">
            {" "}
            Network not supported !!
          </div>
          <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            Please Change your network to {network.targetNetwork} to explore
            nfts
          </div>
          <div className="flex justify-center items-center pt-6">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/create");
              }}
            >
              Learn How to change
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className=" pt-28 font-inter">
      <div className="text-4xl font-bold px-8 py-6">Explore</div>
      <Nftonsale arr={presetdata} />
    </div>
  );
};

export default Explore;
