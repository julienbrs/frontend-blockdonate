import Image from "next/image"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Footer from "../components/Footer"
import Moralis from "moralis"

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

    const [amount, setAmount] = useState(0.1)
    const [amountFunded, setAmountFunded] = useState(0)
    const [numberBackers, setNumberBackers] = useState(0)

    /* Callable functions */

    const { runContractFunction: fund } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "fund",
        msgValue: PRICE,
        params: {},
    })

    /* View Functions */

    const { runContractFunction: getNumberBackers } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "getNumberBackers",
    })
    const { runContractFunction: getAmountFunded } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "getAmountFunded",
        params: {},
    })

    const updateUIValues = async () => {
        const totalAmountFunded = await getAmountFunded()
        const numbBackers = await getNumberBackers()
        console.log(numbBackers)

        const balanceInEther = ethers.utils.formatEther(totalAmountFunded)
        setAmountFunded(balanceInEther)
        setNumberBackers(numbBackers.toNumber())
    }

    async function testcall() {
        console.log(await getNumberBackers())
    }
    async function test() {
        console.log("click")
        console.log("Address:", blockDonateAddress)
        fund()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <div className="flex flex-row justify-center mt-[2%] ">
            <div className="flex flex-col justify-start pt-5 w-[75%]">
                <h1 className="font-semibold leading-[125%] text-[#0F172A] text-[2.1em] mb-[1.5%]">
                    Dune Tarot Deck, A Tribute
                    <br />
                </h1>
                <div className="flex flex-row justify-center">
                    <div className="flex flex-col w-[55%] mr-[3%]">
                        <Image src={ImgTarot} alt="Tarot Dune" className="mb-[2%]" />
                        <div className="font-medium text-[#64748B] text-[1.1em]">
                            An artistic tarot deck inspired by the world of Frank Herbert's Dune.
                            78 beautifully illustrated cards featuring characters, creatures, and
                            landscapes. Help us bring this project to life by supporting our
                            campaign.
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
                            $ {amountFunded}
                        </h1>
                        <p className="font-semibold text-[#64748B] leading-[125%] mb-[3%]">
                            collected out of $60 000
                        </p>
                        <div className="flex flex-row mb-[3%] items-center">
                            <Image src={logoBackers} alt="logo Backers" className="mr-[2%]" />
                            <h2 className="font-semibold text-[#475569] leading-[125%]">
                                {numberBackers} backers
                            </h2>
                        </div>
                        <div className="flex flex-row mb-[3%] items-center">
                            <Image src={logoClock} alt="Logo Clck" className="mr-[2%]" />
                            <h2 className="font-semibold text-[#475569] leading-[125%]">
                                17 days left
                            </h2>
                        </div>
                        <div>
                            {isWeb3Enabled ? (
                                <div>
                                    <button
                                        // todo handlefundsuccess
                                        onClick={async () => fund()}
                                        className="bg-[#F97316] rounded-[49px] border-2	border-white border-solid text-[#ffffff] px-8 py-2.5 font-bold"
                                    >
                                        Back this project
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button className="bg-[#ffffff] rounded-[49px] pointer-events-none border-2	border-white border-solid text-[#F97316] px-8 py-2.5 font-bold">
                                        Please connect to Web3
                                    </button>{" "}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
