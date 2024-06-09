import { Card, CardContent } from "@/components/ui/card";
import { IconCurrencyEthereum } from "@tabler/icons-react";

const Nftcard = ({ val, indx }) => {
  return (
    <Card className=" group max-w-62 h-full cursor-pointer hover:bg-[#161616]">
      <CardContent className="p-2 h-full text-sm sm:text-sm md:text-lg ">
        <div className="flex flex-col h-full justify-between gap-3">
          {/* IMAGE & TITLE */}
          <div>
            <div className="aspect-square overflow-hidden">
              <img
                src={val.src}
                className="object-cover rounded-sm transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              ></img>
            </div>
            <div className="font-bold pt-3">{val.title}</div>
            <div className="text-xs font-semibold text-[#808080]">
              By {val.creator}
            </div>
          </div>

          {/* PRICE */}
          <div className="flex justify-between items-center bg-[#1c1c1c] px-2 py-1 rounded-md">
            <div className="text-xs font-semibold text-[#494949] ">Price</div>
            <div className="flex font-bold items-center">
              <IconCurrencyEthereum className="w-4 h-4 mr-1 " />
              {val.price}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Nftcard;
