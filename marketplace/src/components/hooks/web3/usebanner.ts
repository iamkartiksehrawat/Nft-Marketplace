import { useWeb3 } from "@/components/providers/web3";
import { CryptoHookFactory } from "@/types/hooks";
import axios from "axios";
import useSWR from "swr";

type UseBannerResponse = {
  isLoading: boolean;
};

type BannerHookFactory = CryptoHookFactory<string, UseBannerResponse>;

export type UseBannerHook = ReturnType<BannerHookFactory>;

export const hookFactory: BannerHookFactory =
  ({ provider }) =>
  () => {
    const { usr } = useWeb3();
    const authToken = localStorage.getItem("authToken");
    const { data, mutate, isLoading, ...swr } = useSWR(
      provider ? "web3/usebanner" : null,
      async () => {
        if (!usr || !authToken) return null;
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/details/banner`,
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          if (res.status == 200) {
            return res.data.banner;
          }
          return null;
        } catch (e: any) {}
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
