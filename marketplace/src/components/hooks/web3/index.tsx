import { useHooks } from "@/components/providers/web3";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount();

  return {
    account: swrRes,
  };
};

export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks.useNetwork();

  return {
    network: swrRes,
  };
};

export const useListedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useListedNfts();

  return {
    nfts: swrRes,
  };
};

export const useOwnedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useOwnedNfts();

  return {
    nfts: swrRes,
  };
};

export const useAvatar = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAvatar();

  return {
    avatar: swrRes,
  };
};

export const useUsername = () => {
  const hooks = useHooks();
  const swrRes = hooks.useUsername();

  return {
    username: swrRes,
  };
};

export const useBanner = () => {
  const hooks = useHooks();
  const swrRes = hooks.useBanner();

  return {
    banner: swrRes,
  };
};
