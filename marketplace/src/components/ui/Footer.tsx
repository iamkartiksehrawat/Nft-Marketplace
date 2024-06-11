import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="bg-[#0f0f0f] w-full font-inter">
      <div className="flex py-12 mx-6 gap-2 justify-around items-start">
        <div className="flex flex-col gap-1 md:gap-3">
          <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg ">
            MarketPlace
          </div>
          <div className="text-[#585858] font-semibold">Explore</div>
          <div className="text-[#585858] font-semibold">Buy</div>
          <div className="text-[#585858] font-semibold">Sell</div>
        </div>

        <div className="flex flex-col gap-1 md:gap-3">
          <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg">
            Account
          </div>
          <div className="text-[#585858] font-semibold">Profile</div>
          <div className="text-[#585858] font-semibold">Dashboard</div>
        </div>

        <div className="flex flex-col gap-1 md:gap-3">
          <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg">
            Community
          </div>
          <div className="text-[#585858] font-semibold">Learn</div>
        </div>
      </div>
      <div className="flex items-center justify-center border-b-2 mx-8">
        <img
          src="/logos/logo_with_name.png"
          className="w-[100px] py-6"
          alt="Logo"
        ></img>
      </div>
      <div className="flex w-full justify-center p-4 py-8">
        <div className="flex w-3/4 justify-between">
          <div className="text-sm font-normal text-[#585858]">Apolio</div>
          <div className="text-sm font-normal text-[#585858]">MIT License</div>
          <div className="text-sm font-normal text-[#585858]">Terms</div>
          <div className="text-sm font-normal text-[#585858]">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
