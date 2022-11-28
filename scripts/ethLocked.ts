import { ethers } from "hardhat"

const ethLocked = async () => {
    const ethPool = await ethers.getContract("ETHPool")

    const ethLockedInPool = await ethers.provider.getBalance(ethPool.address)

    console.log(`Amount of ETH locked in pool: ${ethLockedInPool}`)
}

ethLocked()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
