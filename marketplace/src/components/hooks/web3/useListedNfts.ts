import { CryptoHookFactory } from "@/types/hooks";
import { Nft } from "@/types/nft";
import { ethers } from "ethers";

import useSWR from "swr";

type UseListedNftsResponse = {
  buyNft: (token: number, value: number) => Promise<void>;
  getNftdetails: (token: number) => Promise<Nft | undefined>;
};

type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useListedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getAllNftsOnSale();

        for (let i = 0; i < coreNfts.length; i++) {
          const item = coreNfts[i];
          const owner = await contract!.ownerOfTokenURI(item[0]);
          const tokenURI = await contract!.tokenURI(item[0]);
          const metaRes = await fetch(tokenURI);
          const meta = await metaRes.json();

          nfts.push({
            tokenId: Number(item[0]),
            price: parseFloat(ethers.formatEther(item[1])),
            creator: item[2],
            isListed: item[3],
            owner,
            meta,
          });
        }

        return nfts;
      }
    );

    const buyNft = async (tokenId: number, value: number) => {
      try {
        await contract?.buyNft(tokenId, {
          value: ethers.parseEther(value.toString()),
        });
      } catch (e: any) {
        throw new Error(e.message);
      }
    };

    const getNftdetails = async (tokenId: number) => {
      try {
        const owner = await contract!.ownerOfTokenURI(tokenId);
        const item = await contract!.getNftItem(tokenId);
        const tokenURI = await contract!.tokenURI(tokenId);
        const metaRes = await fetch(tokenURI);
        const meta = await metaRes.json();

        return {
          tokenId: Number(item[0]),
          price: parseFloat(ethers.formatEther(item[1])),
          creator: item[2],
          isListed: item[3],
          owner,
          meta,
        };
      } catch (e: any) {
        console.log(e.message);
      }
    };

    return {
      ...swr,
      buyNft,
      getNftdetails,
      data: data || [],
    };
  };
