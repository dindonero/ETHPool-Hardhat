import { ETHPool } from "../../typechain-types"
import { Signer } from "ethers"
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"

describe("ETHPool Unit Tests", function () {
    let ethPool: ETHPool
    let team: Signer
    let userA: Signer
    let userB: Signer

    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        team = accounts[0]
        userA = accounts[1]
        userB = accounts[2]

        await deployments.fixture("all")

        ethPool = await ethers.getContract("ETHPool")
    })

    it("challenge1 first example", async () => {
        const amountA = ethers.utils.parseEther("100")
        const amountB = ethers.utils.parseEther("300")
        const rewardAmount = ethers.utils.parseEther("200")

        // deposits 100 ETH from userA
        await (await ethPool.connect(userA).deposit({ value: amountA })).wait(1)
        // deposits 300 ETH from userB
        await (await ethPool.connect(userB).deposit({ value: amountB })).wait(1)

        assert.equal(
            (await ethers.provider.getBalance(ethPool.address)).toString(),
            amountA.add(amountB).toString()
        )

        // Team deposits 200 ETH in reward
        await (await ethPool.connect(team).depositReward({ value: rewardAmount })).wait(1)

        assert.equal(
            (await ethers.provider.getBalance(ethPool.address)).toString(),
            amountA.add(amountB).add(rewardAmount).toString()
        )

        const userABalance = await ethers.provider.getBalance(await userA.getAddress())
        const userBBalance = await ethers.provider.getBalance(await userB.getAddress())

        // userA withdraws 150 ETH and userB withdraws 450 ETH
        const txReceiptA = await (await ethPool.connect(userA).withdraw()).wait(1)
        const txReceiptB = await (await ethPool.connect(userB).withdraw()).wait(1)

        const gasCostA = txReceiptA.cumulativeGasUsed.mul(txReceiptA.effectiveGasPrice)
        const gasCostB = txReceiptB.cumulativeGasUsed.mul(txReceiptB.effectiveGasPrice)

        const newUserABalance = await ethers.provider.getBalance(await userA.getAddress())
        const newUserBBalance = await ethers.provider.getBalance(await userB.getAddress())

        assert.equal(
            newUserABalance.sub(userABalance).toString(),
            ethers.utils.parseEther("150").sub(gasCostA).toString()
        )
        assert.equal(
            newUserBBalance.sub(userBBalance).toString(),
            ethers.utils.parseEther("450").sub(gasCostB).toString()
        )
    })

    it("challenge1 second example", async () => {

    })
})
