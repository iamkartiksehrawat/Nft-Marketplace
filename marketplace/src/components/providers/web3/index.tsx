import { createContext, useContext, useEffect, useState } from "react";
import {
  createDefaultState,
  loadContract,
  createWeb3State,
  Web3State,
} from "./utils";
import { Contract, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import axios from "axios";

const pageReload = (usr: boolean) => {
  console.log("request to aayi ");
  console.log(usr);
  if (usr) {
    window.location.reload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider, usr: boolean) => {
  ethereum?.on("chainChanged", () => pageReload(usr));
  ethereum?.on("accountsChanged", () => pageReload(usr));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.removeListener("accountsChanged", pageReload);
};

type Web3ContextType = {
  Web3api: Web3State;
  usr: boolean;
  connectweb3: () => Promise<void>;
  isLoading: boolean;
};

const Web3Context = createContext<Web3ContextType>({
  Web3api: createDefaultState(),
  usr: false,
  connectweb3: async () => {},
  isLoading: false,
});

const Web3Provider = ({ children }) => {
  const [Web3api, setweb3api] = useState<Web3State>(createDefaultState());
  const [usr, setusr] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handlelistner = () => {
      setGlobalListeners(window.ethereum, usr);
    };

    const checktoken = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken && !usr) {
          const provider = new ethers.BrowserProvider(window.ethereum as any);

          const contract = await loadContract("NftMarket", provider);

          const signer = await provider.getSigner();
          const signedcontract = contract.connect(signer);
          const address = await signer.getAddress();
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/auth/token`,
              {
                address,
                authToken,
              }
            );
            if (res.data.authenticated) {
              setweb3api(
                createWeb3State({
                  ethereum: window.ethereum,
                  provider,
                  contract: signedcontract as unknown as Contract,
                  isLoading: false,
                })
              );
              setusr(true);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.log(e);
          } finally {
            setLoading(false);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (!usr) {
      checktoken();
    }
    handlelistner();
    return () => removeGlobalListeners(window.ethereum);
  }, [usr]);

  const connectweb3 = async () => {
    setLoading(true);
    try {
      if (typeof window.ethereum === "undefined") {
        alert(
          "MetaMask is not installed. Please install MetaMask and try again."
        );
        setLoading(false);
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const contract = await loadContract("NftMarket", provider);
      const signer = await provider.getSigner();
      const signedcontract = contract.connect(signer);
      const address = await signer.getAddress();

      const challengeResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/challenge`,
        {
          address,
        }
      );

      const { challenge } = challengeResponse.data;

      const signature = await signer.signMessage(challenge);

      const verifyResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`,
        {
          address,
          signature,
          challenge,
        }
      );

      const { token } = verifyResponse.data;

      localStorage.setItem("authToken", token);

      setweb3api(
        createWeb3State({
          ethereum: window.ethereum,
          provider,
          contract: signedcontract as unknown as Contract,
          isLoading: false,
        })
      );
      setusr(true);
    } catch (e: any) {
      console.log(e);
      setweb3api((api) =>
        createWeb3State({
          ...(api as any),
          isLoading: false,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Web3Context.Provider value={{ Web3api, usr, connectweb3, isLoading }}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { Web3api } = useWeb3();
  return Web3api.hooks;
}

export default Web3Provider;
