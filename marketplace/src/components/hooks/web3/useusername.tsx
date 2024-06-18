import { useWeb3 } from "@/components/providers/web3";
import { CryptoHookFactory } from "@/types/hooks";
import axios from "axios";
import useSWR from "swr";

type UseUsernameResponse = {
  isLoading: boolean;
};

type UsernameHookFactory = CryptoHookFactory<string, UseUsernameResponse>;

export type UseUsernameHook = ReturnType<UsernameHookFactory>;

export const hookFactory: UsernameHookFactory =
  ({ provider }) =>
  () => {
    const { usr } = useWeb3();
    const authToken = localStorage.getItem("authToken");
    const { data, mutate, isLoading, ...swr } = useSWR(
      provider ? "web3/useusername" : null,
      async () => {
        if (!usr) return null;
        try {
          const res = await axios.get(
            "http://localhost:3000/api/details/username",
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          if (res.status == 200) {
            return res.data.username;
          }
          return null;
        } catch (e: any) {
          console.log(e);
          throw new Error(e);
        }
      },
      {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }
    );

    return {
      ...swr,
      data,
      isLoading,
      mutate,
    };
  };
