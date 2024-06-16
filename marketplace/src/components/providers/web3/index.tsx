import { createContext, useContext, useEffect, useState } from "react";
import {
  createDefaultState,
  loadContract,
  createWeb3State,
  Web3Sate,
} from "./utils";
import { Contract, ethers } from "ethers";
import { mutate } from "swr";

import { MetaMaskInpageProvider } from "@metamask/providers";

const pageReload = () => {
  window.location.reload();
};

const updateSignerAndContract = async (
  ethereum: MetaMaskInpageProvider,
  setweb3api
) => {
  const provider = new ethers.BrowserProvider(ethereum as any);
  const signer = await provider.getSigner();
  const contract = await loadContract("NftMarket", provider);
  const signedContract = contract.connect(signer);

  setweb3api((prevState) =>
    createWeb3State({
      ...prevState,
      provider,
      contract: signedContract as unknown as Contract,
    })
  );
};

const handleAccount =
  (
    ethereum: MetaMaskInpageProvider,
    setweb3api: React.Dispatch<React.SetStateAction<Web3Sate>>
  ) =>
  async () => {
    console.log("cheetah hi kehde");
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) {
      pageReload();
    } else {
      await updateSignerAndContract(ethereum, setweb3api);
      mutate("web3/useAccount");
      mutate("web3/useOwnedNfts");
    }
  };

const setGlobalListeners = (
  ethereum: MetaMaskInpageProvider,
  setweb3api: React.Dispatch<React.SetStateAction<Web3Sate>>
) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum, setweb3api));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.removeListener("accountsChanged", handleAccount);
};

const Web3Context = createContext<Web3Sate>(createDefaultState());

const Web3Provider = ({ children }) => {
  const [Web3api, setweb3api] = useState<Web3Sate>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const contract = await loadContract("NftMarket", provider);

        const signer = await provider.getSigner();
        const signedcontract = contract.connect(signer);

        setGlobalListeners(window.ethereum, setweb3api);
        setweb3api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract: signedcontract as unknown as Contract,
            isLoading: false,
          })
        );
      } catch (e: any) {
        setweb3api((api) =>
          createWeb3State({
            ...(api as any),
            isLoading: false,
          })
        );
      }
    }
    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, []);

  return (
    <Web3Context.Provider value={Web3api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;
