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
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../providers/web3";
import { Skeleton } from "./skeleton";
import { useAvatar, useUsername } from "../hooks/web3";

const Walletbar = ({
  account,
  network,
  isnetworkloading,
  supported,
  targetnetwork,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { connectweb3, isLoading, usr } = useWeb3();
  const { avatar } = useAvatar();
  const { username } = useUsername();

  useEffect(() => {
    if (usr && !supported) {
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
      ) : usr ? (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent active:bg-transparent  data-[active]:bg-transparent data-[state=open]:bg-transparent focus:bg-transparent">
                  <Avatar className=" cursor-pointer">
                    {avatar.isLoading ? (
                      <AvatarFallback className="font-bold">
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                      </AvatarFallback>
                    ) : avatar.data ? (
                      <AvatarImage src={avatar.data} />
                    ) : (
                      <AvatarFallback className="font-bold">{username.isLoading ?  <IconLoader2 className="h-4 w-4 animate-spin" /> : username.data ? username.data.charAt(0) : '' }</AvatarFallback>
                    )}
                  </Avatar>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-auto right-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="flex gap-2 w-max font-bold">
                        <div>Username :</div>
                        <div className=" text-[#808080] font-semibold">
                          {username.isLoading ? (
                            <>
                              {" "}
                              <Skeleton className="h-[20px] w-[120px] " />
                            </>
                          ) : (
                            username.data
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 w-max font-bold">
                        <div>Network :</div>
                        <div className=" text-[#808080] font-semibold">
                          {isnetworkloading ? (
                            <>
                              {" "}
                              <Skeleton className="h-[20px] w-[120px] " />
                            </>
                          ) : network ? (
                            network
                          ) : (
                            "Unknown network"
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 w-max font-bold">
                        <div className="font-bold">Wallet Address :</div>
                        <div className=" text-[#808080] font-semibold">
                          {account ? (
                            `0x${account[2]}${account[3]}${
                              account[4]
                            }....${account.slice(-4)}`
                          ) : (
                            <div>
                              <Skeleton className="h-[20px] w-[120px] " />
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      ) : (
        <Button
          className="max-[640px]:h-8 max-[640px]:text-4 max-[640px]:px-2"
          onClick={() => {
            connectweb3();
          }}
        >
          Connect
        </Button>
      )}
    </>
  );
};

export default Walletbar;
