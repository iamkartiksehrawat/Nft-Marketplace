import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nftcard from "@/components/ui/Nftcard";
import { useOwnedNfts } from "@/components/hooks/web3";
import { Nft } from "@/types/nft";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork } from "@/components/hooks/web3";
import { useEffect, useState } from "react";

const Salenft = () => {
  const { nfts } = useOwnedNfts();

  const arr = nfts.data as Nft[];

  return arr.length == 0 ? (
    <div className="w-full flex py-4 items-center justify-center">
      <Card className="mx-4">
        <CardContent className="p-8">
          <div className="font-bold text-4xl text-center">
            {" "}
            No NFTs Listed for Sale
          </div>
          <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            You haven't listed any NFTs for sale yet. List your NFTs to make
            them available for purchase in the marketplace.
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 ">
      {arr
        .filter((val) => val.isListed)
        .map((val, index) => (
          <Nftcard val={val} indx={index} key={index} isauth={true} />
        ))}
    </div>
  );
};

const Notlistednft = () => {
  const { nfts } = useOwnedNfts();

  const arr = nfts.data as Nft[];

  return arr.length == 0 ? (
    <div className="w-full flex py-4 items-center justify-center">
      <Card className="mx-4">
        <CardContent className="p-8">
          <div className="font-bold text-4xl text-center">
            {" "}
            No NFTs Available
          </div>
          <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            You currently don't have any NFTs that are not listed for sale.
            Create more NFTs to see them here.
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 ">
      {arr
        .filter((val) => !val.isListed)
        .map((val, index) => (
          <Nftcard val={val} indx={index} key={index} isauth={true} />
        ))}
    </div>
  );
};

const Creatednft = () => {
  const navigate = useNavigate();
  const { nfts } = useOwnedNfts();
  const { account } = useAccount();
  const [arr, setarr] = useState<Nft[]>([]);

  useEffect(() => {
    const creatednftdata = async () => {
      try {
        const arr = await nfts.getCreatedNft(account.data);
        setarr(arr);
      } catch (e: any) {
        console.log(e);
      }
    };
    creatednftdata();
  }, []);

  return arr.length == 0 ? (
    <div className="w-full flex py-4 items-center justify-center">
      <Card className="mx-4">
        <CardContent className="p-8">
          <div className="font-bold text-4xl text-center">
            {" "}
            No NFTs Created yet
          </div>
          <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            It looks like you haven't created any NFTs. Start creating your own
            digital assets and showcase them here!
          </div>
          <div className="flex justify-center items-center pt-6">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/create");
              }}
            >
              Create Nft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 ">
      {arr?.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} isauth={true} />
      ))}
    </div>
  );
};

const Ownednft = () => {
  const { nfts } = useOwnedNfts();
  const navigate = useNavigate();
  const arr = nfts.data as Nft[];

  return arr.length == 0 ? (
    <div className="w-full flex py-4 items-center justify-center">
      <Card className="mx-4">
        <CardContent className="p-8">
          <div className="font-bold text-4xl text-center">
            {" "}
            No NFTs Purchased yet
          </div>
          <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
            {" "}
            It looks like you haven't bought any NFTs yet. Explore the
            marketplace to find unique digital assets and start building your
            collection!
          </div>
          <div className="flex justify-center items-center pt-6">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Explore Nfts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 ">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} isauth={true} />
      ))}
    </div>
  );
};

const Menubar = () => {
  return (
    <div className="p-4">
      <Tabs defaultValue="owned" className="w-full">
        <TabsList>
          <TabsTrigger value="owned">Owned</TabsTrigger>
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="sale">Listed/On sale</TabsTrigger>
          <TabsTrigger value="notlisted">Not Listed</TabsTrigger>
        </TabsList>
        <TabsContent value="owned">
          <Ownednft />
        </TabsContent>
        <TabsContent value="created">
          <Creatednft />
        </TabsContent>
        <TabsContent value="sale">
          <Salenft />
        </TabsContent>
        <TabsContent value="notlisted">
          <Notlistednft />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Details = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const acc = account.data?.toString();
  const netw = network.data;

  return (
    <div className="pt-8 p-4">
      {/* title */}
      <div className="font-bold text-3xl">HAPE PRIME</div>
      {/* description */}
      <div className="text-sm font-semibold text-[#808080] py-4">
        Hape prime is a new generation of Hape toys that combines traditional
        wooden toys with modern technology
      </div>
      <div className="flex flex-col gap-2 p-4 border-2 rounded-lg">
        <div className="font-bold">
          Network :{" "}
          <span className="text-[#808080] text-base max-sm:text-xs">
            {netw ? netw : "Unknown network"}
          </span>
        </div>
        <div className="font-bold">
          Address :
          <span className="text-[#808080] text-base max-sm:text-xs">
            {acc ? ` 0x${acc[2]}${acc[3]}${acc[4]}....${acc.slice(-4)}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="w-full p-4">
      <div className="w-full h-[300px] relative rounded-md border-2 ">
        <img
          src="images/social_banner.png"
          className="object-cover w-full h-full object-center"
        />
        <div className="absolute -bottom-8 left-4 rounded-lg w-[132px] h-[132px] overflow-hidden">
          <img
            src="/images/logo.webp"
            className="object-cover w-full h-full"
          ></img>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className=" pt-24 font-inter">
      <Banner />
      <Details />
      <Menubar />
    </div>
  );
};

export default Profile;
