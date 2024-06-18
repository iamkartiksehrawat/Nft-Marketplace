import { useWeb3 } from "@/components/providers/web3";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { IconPlus, IconLoader2, IconCheck } from "@tabler/icons-react";
import { toast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const traitSchema = z.object({
  key: z.string().min(3, "Trait key is required"),
  value: z.string().min(3, "Trait value is required"),
});

const Priceschema = z
  .number()
  .gt(0, { message: "Price must be greater than 0" });

const nftSchema = z.object({
  title: z.string().min(3, "Title is required"),
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  }),
  description: z.string().min(10, "Description is required"),
  traits: z.array(traitSchema).min(1, "At least one trait is required"),
});

function generateRandomName() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomName = "";
  for (let i = 0; i < 14; i++) {
    randomName += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return randomName;
}

const CreateNft = () => {
  const { usr, Web3api } = useWeb3();
  const { contract, provider } = Web3api;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [traits, setTraits] = useState([{ key: "", value: "" }]);
  const [errors, setErrors] = useState<any>({});
  const [isloading, setloading] = useState(false);
  const [isminting, setminting] = useState(false);
  const [price, setPrice] = useState("");
  const [priceerror, setpriceerror] = useState(false);
  const [nftURI, setnftURI] = useState("");
  const [successmodal, setsuccessmodal] = useState(true);
  const navigate = useNavigate();

  const handleTraitChange = (index, event) => {
    const newTraits = traits.map((trait, i) => {
      if (i === index) {
        return { ...trait, [event.target.name]: event.target.value };
      }
      return trait;
    });
    setTraits(newTraits);
  };

  const handleAddTrait = () => {
    setTraits([...traits, { key: "", value: "" }]);
  };

  const handleRemoveTrait = (index) => {
    const newTraits = traits.filter((_, i) => i !== index);
    setTraits(newTraits);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleMinting = async (event) => {
    setloading(true);
    event.preventDefault();

    const result = Priceschema.safeParse(Number(price));

    if (!result.success) {
      console.log(result);
      setpriceerror(true);
      setloading(false);
    } else {
      if (nftURI == "") {
        console.log(nftURI, "nftttt uri h bhai ");
        console.log("ye vala chla");
        toast({
          variant: "destructive",
          title: "Error Occured",
          description:
            "NFT could not be minted, please check your internet connection and try again.",
        });
        setminting(false);
        setloading(false);
        navigate("/create");
        return;
      }

      const listingPrice = ethers.parseEther("0.025");
      try {
        const tx = await contract?.mintToken(nftURI, ethers.parseEther(price), {
          value: listingPrice,
        });

        await tx?.wait();

        setsuccessmodal(true);
        setloading(false);
      } catch (e: any) {
        console.log(e);
        setloading(false);
        let errorMessage =
          "An error occurred. Please check your wallet balance and network connection.";
        if (e.code == 4001) {
          errorMessage = "User Denied transaction. Nft could not be minted";
        }
        toast({
          variant: "destructive",
          title: "Payment Failed",
          description: errorMessage,
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    setloading(true);
    event.preventDefault();
    const nftData = {
      title,
      image,
      description,
      traits,
    };

    const result = nftSchema.safeParse(nftData);
    if (!result.success) {
      console.log(result);
      const errorMessages = result.error.flatten();
      setErrors(errorMessages.fieldErrors);
      console.log("Validation errors:", errorMessages);
      setloading(false);
      toast({
        variant: "destructive",
        title: "Wrong data entered",
        description: "Please enter the right input.",
      });
    } else {
      setErrors({});
      if (image) {
        const formData = new FormData();

        formData.append("file", image);
        const authToken = localStorage.getItem("authToken");
        try {
          if (authToken) {
            const response = await axios.post(
              "https://api.pinata.cloud/pinning/pinFileToIPFS",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                },
              }
            );

            if (response.status != 200) {
              throw new Error(response.data);
            }

            const Nftmeta = {
              title,
              description,
              traits,
              src: `${import.meta.env.VITE_PINATA_DOMAIN}/ipfs/${
                response.data.IpfsHash
              }`,
            };

            const ranname = generateRandomName();

            const res = await axios.post(
              "https://api.pinata.cloud/pinning/pinJSONToIPFS",
              {
                pinataContent: Nftmeta,
                pinataMetadata: {
                  name: ranname,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                },
              }
            );

            if (res.status != 200) {
              throw new Error(res.data);
            }

            setnftURI(
              `${import.meta.env.VITE_PINATA_DOMAIN}/ipfs/${res.data.IpfsHash}`
            );

            setloading(false);
            setminting(true);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          setloading(false);
          toast({
            variant: "destructive",
            title: "Failed to upload image",
            description:
              "There was an error while uploading the image. Please check your internet connection and try again.",
          });
          return;
        }
      }
    }
  };

  return (
    <div className="pt-28 font-inter">
      {usr ? (
        successmodal ? (
          <div className="flex justify-center items-center p-8">
            <Card className="w-full rounded-xl">
              <CardContent className="bg-green-600 rounded-xl">
                <div className="w-full flex flex-col justify-center items-center p-20 gap-6">
                  <div>
                    <IconCheck className="h-36 w-36 bg-white rounded-full text-green-600 p-4" />
                  </div>
                  <div className="text-6xl font-bold">NFT MINTED</div>
                  <div className="font-semibold text-xl">
                    Congratulations, NFT has been minted Sucessfully
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/explore")}
                  >
                    Go to Explore
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center p-8">
              <Card className="w-full ">
                <CardHeader className="text-5xl font-bold text-center sm:text-left p-10">
                  {isloading ? "" : isminting ? "Mint Nft" : "Create Nft"}
                </CardHeader>
                <CardDescription className="px-12 ">
                  {isloading ? (
                    ""
                  ) : isminting ? (
                    <>Mint your Nft on the blockchain</>
                  ) : (
                    <>
                      {" "}
                      Please ensure the information entered in the form is
                      accurate as it will appear alongside your NFT on the
                      marketplace.
                    </>
                  )}
                </CardDescription>
                <CardContent className="p-8 pt-2">
                  {isloading ? (
                    <div className="w-full flex justify-center items-center p-48 gap-2">
                      <IconLoader2 className="h-10 w-10 animate-spin" /> Loading
                    </div>
                  ) : isminting ? (
                    <form onSubmit={handleMinting}>
                      <div className="flex flex-col gap-2 m-4 my-8">
                        <Label>Price:</Label>
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className={` ${priceerror ? "border-red-500" : ""} `}
                        />
                        {priceerror ? (
                          <span className="text-xs text-red-600">
                            Price is in ETH and it must be greater than 0.
                          </span>
                        ) : (
                          <span className="text-xs text-[#808080]">
                            Price is in ETH and it must be greater than 0.
                          </span>
                        )}
                      </div>
                      <div className="p-4 pt-8 ">
                        <Button
                          type="submit"
                          className="w-full font-bold"
                          size="lg"
                        >
                          Mint
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-2 m-4 my-8">
                        <Label>Title/Name:</Label>
                        <Input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className={` ${
                            errors.title ? "border-red-500" : ""
                          } `}
                        />
                        {errors.title ? (
                          <span className="text-xs text-red-600">
                            {errors.title.join(", ")}
                          </span>
                        ) : (
                          <span className="text-xs text-[#808080]">
                            Title must be at least 3 characters long.
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 m-4 my-8">
                        <Label>Image/NFT Image:</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className={` file:text-white ${
                            errors.image ? "border-red-500" : ""
                          } `}
                        />

                        {errors.image ? (
                          <span className="text-xs text-red-600">
                            {errors.image[0] == "Input not instance of File"
                              ? "Please select an image"
                              : errors.image[0]}
                          </span>
                        ) : (
                          <span className="text-xs text-[#808080]">
                            Input media should be image only.
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 m-4 my-8">
                        <Label>Description:</Label>
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className={` ${
                            errors.description ? "border-red-500" : ""
                          } `}
                        />
                        {errors.description ? (
                          <span className="text-xs text-red-600">
                            {errors.description.join(", ")}
                          </span>
                        ) : (
                          <span className="text-xs text-[#808080]">
                            Description must be at least 10 characters long.
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 m-4 my-8">
                        <div className="flex justify-between cursor-pointer">
                          <Label>Traits:</Label>
                          <IconPlus onClick={handleAddTrait} />
                        </div>
                        {traits.map((trait, index) => (
                          <div key={index} className="flex gap-4">
                            <Input
                              type="text"
                              name="key"
                              value={trait.key}
                              placeholder="Trait Key"
                              onChange={(event) =>
                                handleTraitChange(index, event)
                              }
                            />
                            <Input
                              type="text"
                              name="value"
                              value={trait.value}
                              placeholder="Trait Value"
                              onChange={(event) =>
                                handleTraitChange(index, event)
                              }
                            />
                            <Button
                              size="sm"
                              type="button"
                              className=" bg-red-600 text-white hover:bg-red-700 active:bg-red-700"
                              disabled={traits.length == 1 ? true : false}
                              onClick={() => handleRemoveTrait(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        {errors.traits ? (
                          <span className="text-xs text-red-600">
                            {errors.traits.join(", ")}
                          </span>
                        ) : (
                          <span className="text-xs text-[#808080]">
                            There must be atleast 1 trait in your nft.
                          </span>
                        )}
                      </div>
                      <div className="p-4 pt-8 ">
                        <Button
                          type="submit"
                          className="w-full font-bold"
                          size="lg"
                        >
                          Next
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )
      ) : (
        <div className="flex justify-center items-center p-20 pt-28 font-inter">
          <Card className="m-12 mx-4">
            <CardContent className="p-20">
              <div className="font-bold text-4xl text-center">
                {" "}
                Login to Create Nfts !!
              </div>
              <div className="font-semibold text-center text-sm text-[#a0a0a0] pt-3">
                {" "}
                Please first login with metamask to create Nfts
              </div>
              <div className="flex justify-center items-center pt-6">
                <Button variant="outline" onClick={() => {}}>
                  Learn How to Login with Metamask
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreateNft;
