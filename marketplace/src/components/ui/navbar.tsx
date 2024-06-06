import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex px-16 py-6 justify-between items-center fixed top-0 w-full z-10 bg-opacity-75 backdrop-blur-sm ">
      <img
        src="/logos/logo_with_name.png"
        className="w-auto h-8 md:h-14"
        alt="Logo"
      ></img>
      <div className="flex items-center gap-12 text-xs md:text-base">
        <div className="flex gap-12">
          <Link
            to="#"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold"
          >
            Create
          </Link>
          <Link
            to="#"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold"
          >
            Explore
          </Link>
          <Link
            to="#"
            className="text-[#808080] hover:text-accent-foreground focus:text-accent-foreground transition-colors font-semibold"
          >
            Drops
          </Link>
        </div>
        <Button>Connect</Button>
      </div>
    </nav>
  );
};

export default Navbar;
