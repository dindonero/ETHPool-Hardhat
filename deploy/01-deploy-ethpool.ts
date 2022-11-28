import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"

const deployETHPool: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    await deploy("ETHPool", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    })

    log("----------------------------------------------------")
}

export default deployETHPool
deployETHPool.tags = ["all", "ethpool"]
