import { useNavigate, useParams } from "react-router-dom";
import {
  useListedNfts,
  useOwnedNfts,
  useAccount,
} from "@/components/hooks/web3";
import { useEffect, useState } from "react";
import { Nft } from "@/types/nft";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconCurrencyEthereum,
  IconShoppingCart,
  IconListDetails,
  IconPuzzle,
  IconShare2,
  IconFileCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Asset = () => {
  let { tokenid } = useParams();
  const { nfts } = useListedNfts();
  const { nfts: ownednfts } = useOwnedNfts();
  const { account } = useAccount();

  const [data, setdata] = useState<Nft | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isbuying, setbuying] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getNftdetails = async () => {
      setLoading(true);
      try {
        const arr = (await nfts.getNftdetails(Number(tokenid))) as Nft;
        setdata(arr);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getNftdetails();
  });

  const handlebuynft = async () => {
    setbuying(true);
    try {
      await nfts.buyNft(Number(data?.tokenId), Number(data?.price));
      toast({
        variant: "success",
        title: "Purchase Successfull",
        description:
          "Congratulations! You've successfully purchased the NFT. Enjoy your new digital asset and feel free to explore more opportunities within our platform.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description:
          "We're sorry, but your attempt to purchase the NFT was unsuccessful. Please check your wallet balance and network connection, then try again.",
      });
    } finally {
      setbuying(false);
    }
  };

  const handlelistnft = async () => {
    setbuying(true);
    try {
      await ownednfts.listNft(Number(data?.tokenId), Number(data?.price));
      toast({
        variant: "success",
        title: "Listing Successfull",
        description: "Congratulations! You've successfully listed the NFT. ",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Listing Failed",
        description:
          "We're sorry, but your attempt to list the NFT was unsuccessful. Please check your wallet balance and network connection, then try again.",
      });
    } finally {
      setbuying(false);
    }
  };

  console.log(data?.meta.description);

  return (
    <>
      {data ? (
        <div className=" pt-28 font-inter">
          <div className="w-full flex p-4 gap-4">
            <div className="w-[40%]">
              <Card className="overflow-hidden rounded-xl">
                <CardContent className="p-0">
                  <img
                    src={data.meta.src}
                    className="object-contain aspect-square"
                  ></img>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col  gap-2 p-4 flex-1">
              <div className="font-bold text-xl sm:text-2xl md:text-4xl lg:text-6xl">
                {data.meta.title}
              </div>
              <div className="text-xs sm:font-semibold sm:text-base text-[#808080]">
                Owned by{" "}
                {account.data != data.owner
                  ? ` 0x${data.owner[2]}${data.owner[3]}${
                      data.owner[4]
                    }....${data.owner.slice(-4)}`
                  : "you"}
              </div>
              <Card className="overflow-hidden p-4 bg-[#1a1a1a] mt-4 ">
                <CardContent className="p-0">
                  <div className=" text-[#a0a0a0] text-sm font-semibold">
                    Current Price
                  </div>
                  <div className="flex gap-2 items-center font-bold text-2xl sm:text-4xl py-2">
                    <IconCurrencyEthereum />
                    {data.price} ETH
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4">
                    <Button
                      className={`w-full bg-blue-600 font-bold text-white hover:bg-blue-800 active:bg-blue-800 ${
                        ((account.data == data.owner && data.isListed) ||
                          (account.data != data.owner && !data.isListed)) &&
                        "hidden"
                      }`}
                      disabled={isbuying}
                      onClick={data.isListed ? handlebuynft : handlelistnft}
                    >
                      {data.isListed ? (
                        <IconShoppingCart className=" mr-2" />
                      ) : (
                        <IconFileCheck className=" mr-2" />
                      )}
                      {data.isListed ? "Buy Now" : "List Now"}
                    </Button>
                    {account.data == data.owner && data.isListed && (
                      <Button
                        className="bg-[#474747] text-white"
                        disabled={true}
                      >
                        Already Listed
                      </Button>
                    )}
                    <a
                      href={data.meta.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button className="w-full text-black font-bold bg-white hover:bg-[#d5d5d5] active:bg-[#d5d5d5]">
                        <IconShare2 className="mr-2" />
                        View Original Media
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card className=" overflow-hidden bg-[#1a1a1a] mt-4">
                <CardHeader className="font-bold border-b-[1px]">
                  <div className="flex items-center">
                    <IconPuzzle className="mr-2 h-5 w-5" /> Traits
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 p-4 font-semibold text-[#a0a0a0]">
                  {data.meta.traits.map((trait, indx) => (
                    <div
                      className="flex flex-col gap-1 bg-[#3d3d3d] p-3 rounded-lg hover:bg-[#444444]"
                      key={indx}
                    >
                      <span className="text-sm">{trait.key}</span>
                      <span className="text-lg text-white">{trait.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className=" overflow-hidden bg-[#1a1a1a] mt-4">
                <CardHeader className="font-bold border-b-[1px]">
                  <div className="flex items-center">
                    <IconListDetails className="mr-2 h-5 w-5" /> Details
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="text-[#a0a0a0] text-xs ">
                      <span className="font-semibold  ">Creator : </span>
                      {data.creator}
                    </div>
                    <div className="text-[#a0a0a0] text-xs ">
                      <span className="font-semibold">Owner : </span>
                      {data.owner}
                    </div>{" "}
                    <div className="text-[#a0a0a0] text-xs py-4 border-t-[1px]">
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {data.meta.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className=" pt-28 font-inter">
          <div className="w-full flex p-16 gap-4">
            <Skeleton className="h-[500px] w-[600px]" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[36px] w-[600px]" />
              <Skeleton className="h-[24px] w-[100px]" />
              <Skeleton className="h-[150px] w-[700px]" />
              <Skeleton className="h-[150px] w-[700px]" />
            </div>
          </div>
        </div>
      ) : (
        <div className=" pt-28 font-inter">
          <div className="w-full flex py-28 items-center justify-center">
            <Card className="mx-4">
              <CardContent className="p-8">
                <div className="font-bold text-4xl text-center">
                  {" "}
                  This Nft is Not Available.
                </div>
                <div className="flex justify-center items-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/explore");
                    }}
                  >
                    Go to Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Asset;
