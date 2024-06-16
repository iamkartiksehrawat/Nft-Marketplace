import { useWeb3 } from "@/components/providers/web3";
import { CryptoHookFactory } from "@/types/hooks";
import axios from "axios";
import useSWR from "swr";

type UseAccountResponse = {
  isLoading: boolean;
};

type AvatarHookFactory = CryptoHookFactory<string, UseAccountResponse>;

export type UseAvatarHook = ReturnType<AvatarHookFactory>;

export const hookFactory: AvatarHookFactory =
  ({ provider }) =>
  () => {
    const { usr } = useWeb3();
    const authToken = localStorage.getItem("authToken");
    const { data, mutate, isLoading, ...swr } = useSWR(
      provider ? "web3/useavatar" : null,
      async () => {
        if (!usr || !authToken) return null;
        try {
          const res = await axios.get(
            "http://localhost:3000/api/details/avatar",
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          if (res.status == 200) {
            return res.data.avatar;
          }
          return null;
        } catch (e: any) {
          return null;
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
