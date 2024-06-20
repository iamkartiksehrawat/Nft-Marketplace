
<div align="center">

# Apolio NFT-Marketplace

![Static Badge](https://img.shields.io/badge/anytest-2.22-red?style=flat-square&label=hardhat&labelColor=gray&color=blue)
![Static Badge](https://img.shields.io/badge/anytest-0.8.20-red?style=flat-square&label=solidity&labelColor=gray&color=green)
![Static Badge](https://img.shields.io/badge/anytest-9.8.1-red?style=flat-square&label=npm&labelColor=gray&color=%23c45dea)
![Static Badge](https://img.shields.io/badge/anytest-MIT-red?style=flat-square&label=License&labelColor=gray&color=%233685ec)
![Static Badge](https://img.shields.io/badge/anytest-%5E18.2.0-red?style=flat-square&label=React&labelColor=gray&color=%23f2ed69)
![Static Badge](https://img.shields.io/badge/anytest-kartik-red?style=flat-square&label=made%20by&labelColor=gray&color=%23d45349)

</div>

<div align="center">
Apolio is a project built on the Ethereum blockchain. It uses React for the frontend, and Node.js, Express, and MongoDB for the backend. The smart contracts are developed with Hardhat and deployed on the Sepolia testnet. Apolio allows users to log in with MetaMask, mint and trade NFTs, and manage their profiles. 
</div>

## Table of Contents

- [Preview](#preview)
- [Built with](#built-with)
- [How to Use](#how-to-use)
- [Improvements](#planned-improvements)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)

## Preview

Check out how it looks :

![image](https://github.com/iamkartiksehrawat/Nft-Marketplace/assets/134216694/dd0ba500-b1f1-45f5-beb9-d41b178a4917)

## Built With

This Project was developed with the following technologies:

#### **Frontend** <sub><sup>React + Typescript</sup></sub>
  - [React](https://github.com/facebook/react/releases)
  - [Shadcn UI](https://github.com/shadcn-ui/ui)
  - [Tailwind](https://github.com/tailwindlabs/tailwindcss)
  - [SWR](https://github.com/vercel/swr)
  - [React-router](https://github.com/remix-run/react-router)
  - [Axios](https://github.com/axios/axios)
  - [Zod](https://github.com/colinhacks/zod)

#### **Backend** <sub><sup>Node.js</sup></sub>
  - [Express](https://expressjs.com/pt-br/)
  - [Mongoose](https://github.com/Automattic/mongoose)

#### **Database**
  - [Mongodb](https://expressjs.com/pt-br/)
  - [Cloudinary](https://cloudinary.com/documentation)
  - [Pinata](https://docs.pinata.cloud/introduction)

#### **Smart Contract**
  - [Solidity](https://github.com/ethereum/solidity)
  - [Hardhat](https://github.com/NomicFoundation/hardhat)
  - [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
  - [Mocha & Chai](https://github.com/mochajs/mocha)
  - [Ethers](https://github.com/ethers-io/ethers.js)

#### **Deployment**
  - Frontend deployed on [Vercel](https://github.com/ethereum/solidity)
  - Backend deployed on [Render](https://github.com/NomicFoundation/hardhat)
  - Smart Contract Deployed on Sepolia and [Verified](https://sepolia.etherscan.io/address/0x1ef0ab04e7c5499c48a54ca28057cbe40d5881f1) via [Etherscan](https://etherscan.io/)


## How to Use

### Requirements

To run the application you'll need:
* [Git](https://git-scm.com)
* [Node](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* [Hardhat](https://github.com/NomicFoundation/hardhat)

* Clone the repository:
  * ```$ git clone https://github.com/iamkartiksehrawat/Nft-Marketplace.git ```

#### Install Dependencies

```bash

cd frontend
npm install
# or
yarn install

cd ../backend
npm install
# or
yarn install

```

#### Environment Variables

Frontend (.env)

```
VITE_BACKEND_URL=<your_backend_url>
VITE_PINATA_DOMAIN=<your_pinata_domain>
VITE_PINATA_JWT=<your_pinata_jwt>
VITE_TARGET_CHAIN=<your_target_chain_id>
```

Backend (.env)

```
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
JWT_SECRET=<your_jwt_secret>
PORT=<your_port>
```

#### Development

```bash
cd frontend
npm run dev
# or
yarn dev

cd backend
npm run dev
# or
yarn dev
```

### Smart Contract

#### Development Blockchain

```bash
cd hardhat
# installing dependencies
npm install

#Development blockchain
npx hardhat node

#compiling smart contracts
npx hardhat run scripts/deploy.js --network localhost

#testing smart contracts
npx hardhat test
```

#### Keys.json

A file containing your infura key , etherscan key , metamask private key
```
{
    "INFURA_KEY":<your_infura_key>,
    "ETHERSCAN_KEY":<your_etherscan_key>,
    "METAMASK_PRIVATE_KEY":<your_metamask_key>
}
```

#### Sepolia or any other blockchain network

```bash
cd hardhat
# compiling and deploying your contract
npx hardhat run scripts/deploy.js --network <your-network-name>

#verifying your contract on etherscan
npx hardhat verify --network sepolia <contract_address> <owner_public_address> 

```


## Usage

### User Functionalities

- **Minting NFTs**: Users can mint new NFTs on the Sepolia testnet blockchain.
  
- **Buying NFTs**: Users can purchase NFTs listed on the marketplace using Ether.
  
- **Selling NFTs**: Users can list their NFTs for sale and receive Ether upon successful sales.

- **Web3 Login**: Users can authenticate using MetaMask or another Web3-enabled wallet.
  
- **Profile Management**: 
  - **Create Profile**: Users can create a profile associated with their wallet address.
  - **Edit Profile**: Users can modify their profile information, including name and banner images.

### Content and Learning

- **Learn Section**: A dedicated section provides educational articles and resources about NFTs.
  
- **Newsletter Subscription**: Users can subscribe to receive updates and newsletters about new articles and marketplace developments.


## Planned Improvements

- **Advanced Search and Filtering**: Implement an advanced search and filtering options for NFTs based on metadata, categories, and creator information.
  
- **Auction System**: Introduce an auction mechanism for NFTs, allowing users to bid and participate in dynamic pricing auctions.
  
- **Analytics Dashboard**: Develop an analytics dashboard for users and creators to track sales, trends, and performance metrics of their NFTs.

## License

This project is under the **MIT license**. See the [LICENSE](https://github.com/iamkartiksehrawat/Nft-Marketplace/blob/main/LICENSE) for more information.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

##

Feel free to explore the repository and get in touch if you have any questions or feedback. Happy coding!

Get in touch - 

[![Email - Kartik Sehrawat](https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail)](mailto:sehrawatkar@gmail.com)
[![Linkedin - iamkartiksehrawat](https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin)](https://www.linkedin.com/in/iamkartiksehrawat/)  












