export type NftMeta = {
  title: string;
  src: string;
  skills: {
    type: string;
    background: string;
  };
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
