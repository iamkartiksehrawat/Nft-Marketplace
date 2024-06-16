import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAccount, useNetwork } from "../hooks/web3";
import Walletbar from "./walletbar";
import {
  IconMenu2,
  IconCirclePlus,
  IconBomb,
  IconBrandSafari,
} from "@tabler/icons-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { account } = useAccount();
  const { network } = useNetwork();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "flex font-inter px-16 py-6 max-[640px]:px-8  justify-between items-center fixed top-0 w-full z-10 bg-opacity-75 backdrop-blur-sm ",
        {
          "border-b": scrolled,
        }
      )}
    >
      <img
        src="/logos/logo_with_name.png"
        className="w-auto h-8 md:h-14 cursor-pointer"
        alt="Logo"
        onClick={() => navigate("/")}
      ></img>
      <div className="flex items-center gap-12 text-xs md:text-base max-[640px]:gap-4">
        <div className="flex gap-12">
          <Link
            to="/create"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold hidden min-[640px]:inline-flex"
          >
            Create
          </Link>
          <Link
            to="/explore"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold hidden min-[640px]:inline-flex"
          >
            Explore
          </Link>
          <Link
            to="#"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold hidden min-[640px]:inline-flex"
          >
            Learn
          </Link>
        </div>
        {/* Wallet Bar */}
        <Walletbar
          account={account.data}
          network={network.data}
          isnetworkloading={network.isLoading}
          supported={network.isSupported}
          targetnetwork={network.targetNetwork}
        />
        <div className="sm:hidden px-2">
          <Sheet key="left">
            <SheetTrigger>
              <IconMenu2 className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent className="max-w-[50%]">
              <div className="flex items-center justify-center border-[1px] rounded-lg hover:bg-[#161616] mb-4 mt-8">
                <IconCirclePlus className="w-4 h-4 mr-2" />
                <Link to="#" className="font-semibold text-lg py-2">
                  Create
                </Link>
              </div>
              <div className="flex items-center justify-center border-[1px] rounded-lg hover:bg-[#161616] mb-4">
                <IconBrandSafari className="w-4 h-4 mr-2" />
                <Link to="#" className="font-semibold text-lg py-2">
                  Explore
                </Link>
              </div>
              <div className="flex items-center justify-center border-[1px] rounded-lg hover:bg-[#161616] mb-4">
                <IconBomb className="w-4 h-4 mr-2" />
                <Link to="#" className="font-semibold text-lg py-2">
                  Learn
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
