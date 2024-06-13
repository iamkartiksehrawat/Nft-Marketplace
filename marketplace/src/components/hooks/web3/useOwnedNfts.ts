import { CryptoHookFactory } from "@/types/hooks";
import { Nft } from "@/types/nft";
import { ethers } from "ethers";
import useSWR from "swr";

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>;
  getCreatedNft: (creator: string | undefined) => Promise<Nft[]>;
};
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>;

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>;

export const hookFactory: OwnedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? "web3/useOwnedNfts" : null,
      async () => {
        const nfts = [] as Nft[];
        const coreNfts = await contract!.getOwnedNfts();

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

    const getCreatedNft = async (creator: string | undefined) => {
      const nfts = [] as Nft[];
      if (creator) {
        try {
          const coreNfts = await contract!.getNftsCreatedBy(creator);

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
        } catch (e: any) {
          console.log(e);
        }
      }

      return nfts;
    };

    const listNft = async (tokenId: number, price: number) => {
      try {
        await contract?.placeNftOnSale(
          tokenId,
          ethers.parseEther(price.toString()),
          {
            value: ethers.parseEther((0.025).toString()),
          }
        );
      } catch (e: any) {
        throw new Error(e.message);
      }
    };

    return {
      ...swr,
      listNft,
      getCreatedNft,
      data: data || [],
    };
  };
