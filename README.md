# ETHPool Hardhat Smart Contract

ETHPool provides a service where people can deposit ETH and they will receive rewards proportional to their deposits in the pool.
Users are able to take out their deposits along with their portion of rewards at any time.
New rewards are deposited manually into the pool by the ETHPool team using a contract function.


## Installation

1. Clone the repository and install the dependencies.
```bash
git clone https://github.com/dindonero/ETHPool-Hardhat.git
cd ETHPool-Hardhat
yarn install
```
2. (Optional: Goerli) Create a `.env` file in the root directory and add the following environment variables:
```bash
GOERLI_RPC_URL=
PRIVATE_KEY=
ETHERSCAN_API_KEY=
```

### Deploy the contract

```bash
yarn deploy
```

### Run the tests
```bash
yarn test
```

## Improvement proposal

The improvement proposal can be found in the [EPIP-0001 file](EPIP-0001.md).

## Goerli deployment

Contract deployed at: [Goerli Etherscan](https://goerli.etherscan.io/address/0x1f237f7540f1f9f5ec11526becec3ba4504e5f16)