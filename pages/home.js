import Image from "next/image"
import { useState } from "react"
import { ethers } from "ethers"

import ImgTarot from "../components/assets/ImgTarot.png"
import logoBackers from "../components/assets/logoBackers.png"
import logoClock from "../components/assets/logoClock.png"

import BlockDonateAbi from "../constants/FundMe.json"
import networkMapping from "../constants/networkMapping.json"

import { useWeb3Contract, useMoralis } from "react-moralis"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainIdString = chainId ? parseInt(chainId).toString() : null
    const blockDonateAddress = chainId ? networkMapping[chainIdString].FundMe[0] : null

    const PRICE = ethers.utils.parseEther("1")

    const { runContractFunction } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
    })

    const [amount, setAmount] = useState(0.1)
    const [owner, setOwner] = useState("Andre")

    const { runContractFunction: fund } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "fund",
        msgValue: PRICE,
        params: {},
    })

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            updateUIValues()
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    // async function donateToProject(amount) {
    //     console.log("Click!")
    //     console.log("Address is: ", blockDonateAddress)
    //     console.log("Abi is: ", BlockDonateAbi)
    //     runContractFunction(
    //         "fund",
    //         {},
    //         amount,
    //         (error) => {
    //             console.log("WE GOT AN ERROR:", error)
    //         },
    //         () => {
    //             console.log("WE GOOD")
    //         }
    //     )
    //     console.log("Click ended...")
    // }

    // async function handleDonateSuccess() {
    //     console.log("WE ARE IN APPROVESUCCESS")
    // }

    const { runContractFunction: getOwner } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "getOwner",
        params: {},
    })

    async function test() {
        console.log("click")
        console.log("Address:", blockDonateAddress)
        const owner = await getOwner()
        console.log(owner)
        fund({
            onError: (error) => {
                console.log("error is DETECTED")
                console.log(error)
            },
            onSuccess: () => {
                console.log("SUCCESS!!")
            },
        })
        let temp = await getOwner()
        setOwner(temp)
    }

    return (
        <div className="flex flex-row justify-center mt-[2%] ">
            <div className="flex flex-col justify-start pt-5 w-[75%]">
                <h1 className="font-semibold leading-[125%] text-[#0F172A] text-[2.1em] mb-[1.5%]">
                    Lorem ipsum dolor sit amet
                </h1>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col w-[55%] mr-[3%]">
                        <Image src={ImgTarot} alt="Tarot Dune" className="mb-[2%]" />
                        <div className="font-medium text-[#64748B] text-[1.1em]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel
                            ipsum tempor, iaculis purus eget, bibendum felis. Suspendisse sed
                            pulvinar ipsum. Fusce at posuere ipsum, et hendrerit felis.
                            Pellentesque vehicula dolor at lacus ultrices posuere. Suspendisse
                            potenti. Phasellus id consequat felis.
                        </div>
                    </div>
                    <div className="w-[45%]">
                        <div
                            id="wrapper_bar_fund"
                            className="h-[2.5%] bg-[#F9FAFB] w-[100%] rounded-[49px] mb-[2.5%]"
                        >
                            <div id="inner_bar_fund" className="w-[90%] h-full rounded-[49px]" />
                        </div>
                        <h1 className="font-semibold text-[#F97316] leading-[125%] text-[1.9em] mb-[0.5%]">
                            $ {owner}
                        </h1>
                        <p className="font-semibold text-[#64748B] leading-[125%] mb-[3%]">
                            collected out of $60 000
                        </p>
                        <div className="flex flex-row mb-[3%] items-center">
                            <Image src={logoBackers} alt="logo Backers" className="mr-[2%]" />
                            <h2 className="font-semibold text-[#475569] leading-[125%]">
                                845 backers
                            </h2>
                        </div>
                        <div className="flex flex-row mb-[3%] items-center">
                            <Image src={logoClock} alt="Logo Clck" className="mr-[2%]" />
                            <h2 className="font-semibold text-[#475569] leading-[125%]">
                                17 days left
                            </h2>
                        </div>
                        <button
                            onClick={
                                async () => test()
                                /* await fund({
                                    // onComplete:
                                    // onError:
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                }) */
                            }
                            className="bg-[#F97316] rounded-[49px] border-2	border-white border-solid text-[#ffffff] px-8 py-2.5 font-bold"
                        >
                            Back this project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
