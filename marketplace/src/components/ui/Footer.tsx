import { Link } from "react-router-dom";
import { useWeb3 } from "../providers/web3";

const Footer = () => {
  const { usr } = useWeb3();
  return (
    <div className="bg-[#0f0f0f] w-full font-inter">
      <div className="flex py-12 mx-6 gap-2 justify-around items-start">
        <div className="flex flex-col gap-1 md:gap-3">
          <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg ">
            MarketPlace
          </div>
          <Link
            to={"/"}
            className="text-[#585858] font-semibold hover:text-[#747474]"
          >
            Home
          </Link>
          <Link
            to={"/explore"}
            className="text-[#585858] font-semibold hover:text-[#747474]"
          >
            Explore
          </Link>
          <Link
            to={"/create"}
            className="text-[#585858] font-semibold hover:text-[#747474]"
          >
            Create
          </Link>
        </div>

        {usr ? (
          <div className="flex flex-col gap-1 md:gap-3">
            <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg">
              Account
            </div>
            <Link
              to={"/profile"}
              className="text-[#585858] font-semibold hover:text-[#747474]"
            >
              Profile
            </Link>
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-col gap-1 md:gap-3">
          <div className="font-bold text-sm sm:text-md xl:text-2xl md:text-lg">
            Community
          </div>
          <Link
            to={"/learn/home"}
            className="text-[#585858] font-semibold hover:text-[#747474]"
          >
            Profile
          </Link>
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
