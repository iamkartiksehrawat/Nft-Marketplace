import { createContext, useContext, useEffect, useState } from "react";
import {
  createDefaultState,
  loadContract,
  createWeb3State,
  Web3Sate,
} from "./utils";
import { ethers } from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";

const pageReload = () => {
  window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked());
  if (isLocked) {
    pageReload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
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
        // const contract = await loadContract("NftMarket", provider);
        setGlobalListeners(window.ethereum);
        setweb3api(
          createWeb3State({
            ethereum: window.ethereum,
            provider,
            contract: null,
            isLoading: false,
          })
        );
      } catch (e: any) {
        console.log("MetaMask not Installed");
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
