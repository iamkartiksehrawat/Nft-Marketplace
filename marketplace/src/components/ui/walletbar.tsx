import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const Walletbar = ({
  isInstalled,
  isLoading,
  connect,
  account,
  network,
  supported,
  targetnetwork,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    if (isInstalled && account && !supported) {
      toast({
        variant: "warning",
        title: "Network not Supported",
        description: `Please change your network to ${targetnetwork}`,
      });
    }
  }, [supported, account]);

  return (
    <>
      {isLoading ? (
        <Button
          className="max-[640px]:h-8 max-[640px]:text-4 max-[640px]:px-2"
          disabled
        >
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : account ? (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent active:bg-transparent  data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent">
                  <Avatar className=" cursor-pointer">
                    <AvatarImage src="/public/images/logo.webp" />
                    <AvatarFallback className="font-bold">U</AvatarFallback>
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 w-max font-bold">
                        <div>Network :</div>
                        <div className=" text-[#808080] font-semibold">
                          {network ? network : "Unknown network"}
                        </div>
                      </div>

                      <div className="flex gap-2 w-max font-bold">
                        <div className="font-bold">Wallet Address :</div>
                        <div className=" text-[#808080] font-semibold">{`0x${
                          account[2]
                        }${account[3]}${account[4]}....${account.slice(
                          -4
                        )}`}</div>
                      </div>
                    </CardContent>
                  </Card>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      ) : isInstalled ? (
        <Button
          className="max-[640px]:h-8 max-[640px]:text-4 max-[640px]:px-2"
          onClick={() => {
            connect();
          }}
        >
          Connect
        </Button>
      ) : (
        <Button
          className="max-[640px]:h-8 max-[640px]:text-4 max-[640px]:px-2 "
          onClick={() => {
            toast({
              variant: "destructive",
              title: "MetaMask not Installed",
              description: "Install the metamask extension to connect.",
            });
          }}
        >
          Connect
        </Button>
      )}
    </>
  );
};

export default Walletbar;
