import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, BrowserProvider, ethers } from "ethers";
import { setupHooks, Web3Hooks } from "@/components/hooks/web3/setuphooks";
import { Web3Dependencies } from "@/types/hooks";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Web3Sate = {
  isLoading: boolean;
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({ isLoading: true } as any),
  };
};

export const createWeb3State = ({
  ethereum,
  provider,
  contract,
  isLoading,
}: Web3Dependencies) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ ethereum, provider, contract, isLoading }),
  };
};

export const loadContract = async (
  name: string,
  provider: BrowserProvider
): Promise<Contract> => {
  const res = await fetch(`../../../contracts/${name}.json`);
  const artifacts = await res.json();

  const adrs = await fetch(
    "../../../contracts/contract-address-localhost.json"
  );
  const address = await adrs.json();

  if (address.NftMarket) {
    const contract = new ethers.Contract(
      address.NftMarket,
      artifacts.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`Contract: [${name}] cannot be loaded!!`);
  }
};
