import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nftcard from "@/components/ui/Nftcard";

const Ownednft = () => {
  const arr = [
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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 ">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} />
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
          <TabsTrigger value="sale">On Sale</TabsTrigger>
        </TabsList>
        <TabsContent value="owned">
          <Ownednft />
        </TabsContent>
        <TabsContent value="created">{/* <Creatednft /> */}</TabsContent>
        <TabsContent value="sale">{/* <Salenft /> */}</TabsContent>
      </Tabs>
    </div>
  );
};

const Details = () => {
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
          Blockchain :
          <span className="text-[#808080] text-base max-sm:text-xs">
            {" "}
            Ethereum
          </span>
        </div>
        <div className="font-bold">
          Address :
          <span className="text-[#808080] text-base max-sm:text-xs">
            {" "}
            0x9d2fa0c2953a1d71d92134a8142f793423a8357b
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
