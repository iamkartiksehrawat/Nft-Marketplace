import { Web3Dependencies } from "@/types/hooks";
import { hookFactory as createAccountHook, UseAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, UseNetworkHook } from "./useNetwork";
import {
  hookFactory as createListedNftsHook,
  UseListedNftsHook,
} from "./useListedNfts";
import { hookFactory as createAvatarHook, UseAvatarHook } from "./useavatar";

import {
  hookFactory as createOwnedNftsHook,
  UseOwnedNftsHook,
} from "./useOwnedNfts";
import {
  hookFactory as createUsernameHook,
  UseUsernameHook,
} from "./useusername";
import { hookFactory as createBannerHook, UseBannerHook } from "./usebanner";

export type Web3Hooks = {
  useAccount: UseAccountHook;
  useNetwork: UseNetworkHook;
  useListedNfts: UseListedNftsHook;
  useOwnedNfts: UseOwnedNftsHook;
  useAvatar: UseAvatarHook;
  useUsername: UseUsernameHook;
  useBanner: UseBannerHook;
};

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks;
};

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps),
    useListedNfts: createListedNftsHook(deps),
    useOwnedNfts: createOwnedNftsHook(deps),
    useAvatar: createAvatarHook(deps),
    useUsername: createUsernameHook(deps),
    useBanner: createBannerHook(deps),
  };
};
