import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import {network} from "hardhat";
import verify from "../utils/verify";

const developmentChains = ["goerli"]

const deployETHPool: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")

    const args = []
    const ethPool = await deploy("ETHPool", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1,
    })

    log("----------------------------------------------------")

    if (network.name === "goerli" && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(ethPool.address, args)
    }
}

export default deployETHPool
deployETHPool.tags = ["all", "ethpool"]
