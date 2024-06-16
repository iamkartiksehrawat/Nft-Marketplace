import { CryptoHookFactory } from "@/types/hooks";

import useSWR from "swr";

type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAccountHook = ReturnType<AccountHookFactory>;

export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
      provider ? "web3/useAccount" : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0];

        if (!account) {
          throw "Cannot retreive account! Please, connect to web3 wallet.";
        }

        const adrs = account.address;

        return adrs;
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    );

    const connect = async () => {
      try {
        window.ethereum.request({
          method: "eth_requestAccounts",
        });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading as boolean,
      isInstalled: ethereum?.isMetaMask || false,
      mutate,
      connect,
    };
  };
