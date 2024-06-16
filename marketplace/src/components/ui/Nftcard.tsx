import { Card, CardContent } from "@/components/ui/card";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { useWeb3 } from "../providers/web3";

const Showmodal = ({ openmodal, setmodalopen }) => {
  return (
    <AlertDialog open={openmodal} onOpenChange={setmodalopen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-xl">
            <div> Connect your Account</div>
          </AlertDialogTitle>
          <AlertDialogDescription className="fex justify-center items-center">
            <div className="text-center">
              To view details and interact with this NFT, please log in or
              create an account.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogCancel>
            <div>Ok</div>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Nftcard = ({ val, indx }) => {
  const navigate = useNavigate();
  const [openmodal, setmodalopen] = useState(false);
  const { usr } = useWeb3();

  const handlemodal = () => {
    setmodalopen(true);
  };

  return (
    <div>
      <Showmodal openmodal={openmodal} setmodalopen={setmodalopen} />
      <Card
        className="group max-w-62 h-full cursor-pointer hover:bg-[#161616]"
        onClick={() => {
          usr ? navigate(`/asset/${val.tokenId}`) : handlemodal();
        }}
      >
        <CardContent className="p-2 h-full text-sm sm:text-sm md:text-lg ">
          <div className="flex flex-col h-full justify-between gap-3">
            {/* IMAGE & TITLE */}
            <div>
              <div className="aspect-square overflow-hidden rounded-sm">
                <img
                  src={val.meta.src}
                  className="object-cover rounded-sm transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                ></img>
              </div>
              <div className="font-bold pt-3">{val.meta.title}</div>
              <div className="text-xs font-semibold text-[#808080]">
                Owned by{" "}
                {`0x${val.owner[2]}${val.owner[3]}${
                  val.owner[4]
                }....${val.owner.slice(-4)}`}
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
    </div>
  );
};

export default Nftcard;
