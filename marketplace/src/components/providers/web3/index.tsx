import { createContext, useContext, useEffect, useState } from "react";
import { createDefaultState, loadContract, Web3Sate } from "./utils";
import { ethers } from "ethers";

const Web3Context = createContext<Web3Sate>(createDefaultState());

const Web3Provider = ({ children }) => {
  const [Web3api, setweb3api] = useState<Web3Sate>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const contract = await loadContract("NftMarket", provider);

      setweb3api({
        ethereum: window.ethereum,
        provider,
        contract,
        isLoading: false,
      });
    }
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={Web3api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
