import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, BrowserProvider, ethers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: BrowserProvider | null;
  contract: Contract | null;
};

export type Web3Sate = {
  isLoading: boolean;
} & Web3Params;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
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
