export type Trait = {
  [key: string]: string;
};

export type NftMeta = {
  title: string;
  src: string;
  description: string;
  traits: Trait[];
};

export type NftCore = {
  tokenId: number;
  price: number;
  creator: string;
  isListed: boolean;
  owner: string;
};

export type Nft = {
  meta: NftMeta;
} & NftCore;
