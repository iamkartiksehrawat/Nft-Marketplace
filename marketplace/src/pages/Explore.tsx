import Nftcard from "@/components/ui/Nftcard";
import { useListedNfts, useNetwork } from "@/components/hooks/web3";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/components/providers/web3";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const Nftonsale = ({ arr }) => {
  return arr.length == 0 ? (
    <div className="flex justify-center items-center p-20 pt-28 font-inter">
      <Card className="m-12 mx-4">
        <CardContent className="p-24">
          <div className="font-bold text-4xl text-center">No NFTs on sale</div>
          <div className="text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            It looks like there are no NFTs currently available for sale. Check
            back later to discover unique digital assets.
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-8">
      {arr.map((val, index) => (
        <Nftcard val={val} key={index} />
      ))}
    </div>
  );
};

const Explore = () => {
  const { usr } = useWeb3();
  const { nfts } = useListedNfts();
  const { network } = useNetwork();
  const [isloading, setloading] = useState<boolean>(true);
  const [currstate, setcurrstate] = useState<number>(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [presetdata, setpresetdata] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      try {
        const response = await axios.get("/images/Explore/explore.json");
        if (response.status != 200) {
          throw new Error("Failed to fetch data");
        }
        setpresetdata(response.data.list);
      } catch (error) {
        console.error("Error fetching article list:", error);
      } finally {
        setloading(false);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    let timeoutId;
    const getcurrstate = () => {
      if (usr && network.isSupported) {
        setcurrstate(2);
      } else if (usr) {
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
      clearTimeout(timeoutId);
    };
  }, [network, usr]);

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
    <div className=" pt-28 font-inter">
      <div className="text-4xl font-bold px-8 py-6">Explore</div>
      <div className="flex justify-center items-center p-20 pt-28 font-inter">
        <Card className="m-12 mx-4">
          <CardContent className="p-20">
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
    </div>
  ) : (
    <div className=" pt-28 font-inter">
      <div className="text-4xl font-bold px-8 py-6">Explore</div>
      <Nftonsale arr={presetdata} />
      <div className="w-full p-8 pt-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Login required",
              description: `Please login to view all NFTs`,
            });
          }}
        >
          View all
        </Button>
      </div>
    </div>
  );
};

export default Explore;
