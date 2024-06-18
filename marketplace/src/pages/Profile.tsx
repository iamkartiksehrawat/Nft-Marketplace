import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nftcard from "@/components/ui/Nftcard";
import {
  useAvatar,
  useBanner,
  useOwnedNfts,
  useUsername,
} from "@/components/hooks/web3";
import { Nft } from "@/types/nft";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAccount, useNetwork } from "@/components/hooks/web3";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconCamera } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IconLoader2, IconEdit } from "@tabler/icons-react";
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
import axios from "axios";
import { mutate } from "swr";
import { error } from "console";
import { useWeb3 } from "@/components/providers/web3";

const Salenft = () => {
  const { nfts } = useOwnedNfts();

  let arr = nfts.data as Nft[];
  arr = arr.filter((val) => val.isListed);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-2 ">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} />
      ))}
    </div>
  );
};

const Notlistednft = () => {
  const { nfts } = useOwnedNfts();
  let arr = nfts.data as Nft[];
  arr = arr.filter((val) => !val.isListed);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-2 ">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} />
      ))}
    </div>
  );
};

const Creatednft = () => {
  const navigate = useNavigate();
  const { nfts } = useOwnedNfts();
  const { account } = useAccount();
  const [isloading, setloading] = useState(true);
  const [arr, setarr] = useState<Nft[]>([]);

  useEffect(() => {
    const creatednftdata = async () => {
      setloading(true);
      try {
        const arr = await nfts.getCreatedNft(account.data);
        setarr(arr);
      } catch (e: any) {
        console.log(e);
      } finally {
        setloading(false);
      }
    };
    creatednftdata();
  }, []);

  return isloading ? (
    <>
      <Skeleton className="h-[300px] w-[250px]" />
    </>
  ) : arr.length == 0 ? (
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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-2">
      {arr?.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} />
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
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 xl:grid-cols-5 p-2">
      {arr.map((val, index) => (
        <Nftcard val={val} indx={index} key={index} />
      ))}
    </div>
  );
};

const Menubar = () => {
  return (
    <div className="sm:p-4 p-1">
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

const Usermodal = ({ openmodal, setmodalopen }) => {
  const { toast } = useToast();
  const [usr, setusr] = useState("");

  const handleuserchange = (event) => {
    setusr(event.target.value);
  };

  const handleuserupload = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      if (authToken) {
        if (usr == "") {
          throw new Error("User entered empty string");
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/details/username`,
          {
            username: usr,
          },
          {
            headers: {
              authorization: authToken,
            },
          }
        );

        if (response.status == 200) {
          mutate("web3/useusername");
          toast({
            variant: "success",
            title: "Username Changed Successfully !!",
            description: `Your Username has been successfully changed`,
          });
        }
      }
    } catch (error: any) {
      console.log("Error uploading file:", error);
      let errorMessage = "Please try again later.";
      if (error.message === "User entered empty string") {
        errorMessage = "Username cannot be an empty string.";
      }
      toast({
        variant: "destructive",
        title: "Username Could not be Changed",
        description: errorMessage,
      });
    }
  };

  return (
    <AlertDialog open={openmodal} onOpenChange={setmodalopen}>
      <AlertDialogContent className="p-12">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-xl">
            <div>Enter your Username</div>
          </AlertDialogTitle>
          <AlertDialogDescription className="fex justify-center items-center">
            <div className="text-center">
              Please enter a valid username , this will be visible to other
              users in the marketplace.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          id="username"
          type="text"
          className="my-4"
          onChange={handleuserchange}
        />
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction onClick={handleuserupload}>
            Change
          </AlertDialogAction>
          <AlertDialogCancel>
            <div>Cancel</div>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Bannermodal = ({ openmodal, setmodalopen, setloading }) => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (file) {
      setloading(true);
      const formData = new FormData();
      formData.append("image", file);
      const authToken = localStorage.getItem("authToken");
      try {
        if (authToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/details/banner`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: authToken,
              },
            }
          );
          console.log(response, "jo bheji thi");
          if (response.status == 200) {
            mutate("web3/usebanner");
            toast({
              variant: "success",
              title: "Banner Changed Successfully !!",
              description: `Your Profile image has been successfully changed`,
            });
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          variant: "destructive",
          title: "Banner Could not be Changed",
          description: `Please upload the file with specified type or try again later.`,
        });
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <AlertDialog open={openmodal} onOpenChange={setmodalopen}>
      <AlertDialogContent className="p-12">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-xl">
            <div>Upload your image</div>
          </AlertDialogTitle>
          <AlertDialogDescription className="fex justify-center items-center">
            <div className="text-center">
              The image should be of format jpg, jpeg, png, webp only
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          id="picture"
          type="file"
          className=" file:text-white my-4"
          onChange={handleFileChange}
        />
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction onClick={handleImageUpload}>
            Upload
          </AlertDialogAction>
          <AlertDialogCancel>
            <div>Cancel</div>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Imagemodal = ({ openmodal, setmodalopen, setloading }) => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (file) {
      setloading(true);
      const formData = new FormData();
      formData.append("image", file);
      const authToken = localStorage.getItem("authToken");
      try {
        if (authToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/details/avatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: authToken,
              },
            }
          );

          if (response.status == 200) {
            mutate("web3/useavatar");
            toast({
              variant: "success",
              title: "Profile Image Changed",
              description: `Your Profile image has been successfully changed`,
            });
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          variant: "destructive",
          title: "Profile image could not be changed",
          description: `Please upload the file with specified type or try again later.`,
        });
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <AlertDialog open={openmodal} onOpenChange={setmodalopen}>
      <AlertDialogContent className="p-12">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center text-xl">
            <div>Upload you image</div>
          </AlertDialogTitle>
          <AlertDialogDescription className="fex justify-center items-center">
            <div className="text-center">
              The image should be of format jpg, jpeg, png, webp only
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          id="picture"
          type="file"
          className=" file:text-white my-4"
          onChange={handleFileChange}
        />
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction onClick={handleImageUpload}>
            Upload
          </AlertDialogAction>
          <AlertDialogCancel>
            <div>Cancel</div>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Usrinfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  const acc = account.data?.toString();
  const netw = network.data;
  const netloading = network.isLoading;
  const accloading = account.isLoading;

  const [openimagemodal, setimagemodalopen] = useState(false);
  const [openbannermodal, setbannermodalopen] = useState(false);
  const [openusermodal, setusermodalopen] = useState(false);
  const [avatarloading, setavatarloading] = useState(false);
  const [bannerloading, setbannerloading] = useState(false);
  const { avatar } = useAvatar();
  const { username } = useUsername();
  const { banner } = useBanner();

  const handleimagemodal = () => {
    setimagemodalopen(true);
  };

  const handleusermodal = () => {
    setusermodalopen(true);
  };

  const handlebannermodal = () => {
    setbannermodalopen(true);
  };

  return (
    <div className="w-full p-4">
      <Imagemodal
        openmodal={openimagemodal}
        setmodalopen={setimagemodalopen}
        setloading={setavatarloading}
      />

      <Bannermodal
        openmodal={openbannermodal}
        setmodalopen={setbannermodalopen}
        setloading={setbannerloading}
      />

      <Usermodal openmodal={openusermodal} setmodalopen={setusermodalopen} />

      <div
        className="w-full h-[300px] overflow-hidden relative rounded-xl group cursor-pointer"
        onClick={handlebannermodal}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 z-20 hidden group-hover:flex justify-center items-center transition-opacity duration-300">
          <IconCamera className="h-12 w-12" />
        </div>
        {bannerloading || banner.isLoading ? (
          <div className="h-full w-full flex justify-center items-center bg-[#242424]">
            <IconLoader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <img
            src={banner.data ? banner.data : "/images/banner_default.png"}
            className="object-cover w-full h-full object-center group-hover:opacity-35"
          />
        )}
      </div>
      <div className="flex gap-4 p-4">
        <Avatar
          className="group w-28 h-28 cursor-pointer sm:w-48 sm:h-48"
          onClick={handleimagemodal}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-50 z-40 hidden group-hover:flex justify-center items-center transition-opacity duration-300">
            <IconCamera className="h-12 w-12" />
          </div>
          {avatar.isLoading || avatarloading ? (
            <AvatarFallback className="font-bold">
              <IconLoader2 className="h-4 w-4 animate-spin" />
            </AvatarFallback>
          ) : avatar.data ? (
            <AvatarImage src={avatar.data} />
          ) : (
            <AvatarFallback className="font-bold text-5xl group-hover:opacity-35 ">
              {username.isLoading ?  <IconLoader2 className="h-4 w-4 animate-spin" /> : username.data ? username.data.charAt(0) : '' }
            </AvatarFallback>
          )}
        </Avatar>
        <div className="p-2">
          <div className="flex gap-2">
            <div className="font-bold sm:text-5xl text-3xl">
              {username.isLoading ? (
                <Skeleton className="h-[100px] w-[400px] " />
              ) : (
                username.data
              )}
            </div>

            <div>
              <IconEdit
                className="w-5 h-5 cursor-pointer hover:text-[#a8a8a8]"
                onClick={handleusermodal}
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1 pt-4 pl-1 text-[#808080] font-semibold">
            <div>
              Network :{" "}
              {netloading ? (
                <Skeleton className="h-[50px] w-[600px] " />
              ) : netw ? (
                netw
              ) : (
                "Unknown network"
              )}
            </div>
            <div>
              Address :
              {accloading ? (
                <Skeleton className="h-[50px] w-[600px] " />
              ) : acc ? (
                ` 0x${acc[2]}${acc[3]}${acc[4]}....${acc.slice(-4)}`
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className=" pt-24 font-inter">
      <Usrinfo />
      <Menubar />
    </div>
  );
};

export default Profile;
