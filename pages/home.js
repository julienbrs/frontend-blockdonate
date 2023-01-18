import Image from "next/image"
import { useState, useEffect } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

import ImgTarot from "../components/assets/ImgTarot.png"
import logoBackers from "../components/assets/logoBackers.png"
import logoClock from "../components/assets/logoClock.png"
import Close from "../components/assets/Close.png"

import BlockDonateAbi from "../constants/FundMe.json"
import networkMapping from "../constants/networkMapping.json"

import { useWeb3Contract, useMoralis } from "react-moralis"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainIdString = chainId ? parseInt(chainId).toString() : null
    let blockDonateAddress
    const dispatch = useNotification()
    updateAddress()

    const [amount, setAmount] = useState(0.1)
    const [amountFunded, setAmountFunded] = useState("NaN")
    const [numberBackers, setNumberBackers] = useState(0)
    const [showFieldAmount, setShowFieldAmount] = useState(false)
    const [percentCompleted, setPercentCompleted] = useState(0)
    const [inputField, setInputField] = useState(0)
    const [amountToSend, setAmountToSend] = useState(0)

    function updateAddress() {
        if (chainIdString in networkMapping) {
            blockDonateAddress = chainId ? networkMapping[chainIdString].FundMe[0] : null
        }
    }
    /* Callable functions */

    const { runContractFunction: fund } = useWeb3Contract({
        abi: BlockDonateAbi,
        contractAddress: blockDonateAddress,
        functionName: "fund",
        msgValue: amountToSend,
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
        if (isWeb3Enabled && chainIdString in networkMapping) {
            updateAddress()
            const totalAmountFunded = await getAmountFunded()
            const numbBackers = await getNumberBackers()
            const balanceInEther = ethers.utils.formatEther(totalAmountFunded)

            const percent = Math.round((balanceInEther / 7.5) * 100)

            setAmountFunded(balanceInEther)
            setNumberBackers(numbBackers.toNumber())
            setPercentCompleted(percent)
        } else {
            dispatch({
                type: "error",
                title: "Web3 Not Connected",
                message: "Please connect to goerli testnet",
                position: "topR",
            })
        }
    }

    async function handleSubmitFund(event) {
        event.preventDefault()
        if (isWeb3Enabled && chainIdString in networkMapping) {
            updateAddress()
            if (typeof +inputField === "number" && !Number.isNaN(+inputField) && inputField > 0) {
                setAmountToSend(ethers.utils.parseEther(inputField.toString())),
                    fund({
                        onError: (error) => {
                            console.log(error)
                            dispatch({
                                type: "error",
                                title: "Funding Failed",
                                message: "Please check console for error",
                                position: "topR",
                            })
                        },
                        onSuccess: () => {
                            handleFundSuccess()
                        },
                    })
            } else {
                dispatch({
                    type: "warning",
                    message: "Warning: amount incorrect",
                    title: "Enter a valid number",
                    position: "topR",
                })
            }
        } else {
            dispatch({
                type: "warning",
                title: "Web3 Not Connected",
                message: "Please connect to goerli testnet ",
                position: "topR",
            })
        }
    }

    const handleFundSuccess = async () => {
        dispatch({
            type: "info",
            message: "Transaction sent",
            title: "Your donation has been sent",
            position: "topR",
        })
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled, chainIdString])

    return (
        <div className="flex flex-col space-between justify-end">
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
                                An artistic tarot deck inspired by the world of Frank Herbert's
                                Dune. 78 beautifully illustrated cards featuring characters,
                                creatures, and landscapes. Help us bring this project to life by
                                supporting our campaign.
                            </div>
                        </div>
                        <div className="w-[45%]">
                            <div
                                id="wrapper_bar_fund"
                                className="h-[2.5%] bg-[#F9FAFB] w-[95%] rounded-[49px] mb-[2.5%]"
                            >
                                <div
                                    id="inner_bar_fund"
                                    style={{ width: `${percentCompleted}%` }}
                                    className={"h-full rounded-[49px]"}
                                />
                            </div>
                            <h1 className="font-semibold text-[#F97316] leading-[125%] text-[1.9em] mb-[0.5%]">
                                {amountFunded} ETH
                            </h1>
                            <p className="font-semibold text-[#64748B] leading-[125%] mb-[3%]">
                                collected out of 7.5 ETH
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
                                        {!showFieldAmount ? (
                                            <button
                                                // todo handlefundsuccess
                                                onClick={() => {
                                                    setShowFieldAmount(true)
                                                }}
                                                className="bg-[#F97316] rounded-[49px] border-2	border-white border-solid text-[#ffffff] px-8 py-2.5 font-bold"
                                            >
                                                Back this project
                                            </button>
                                        ) : (
                                            <div className="flex flex-col items-baseline">
                                                <div className="flex flex-row items-center mb-[4%]">
                                                    <form>
                                                        <label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="Enter amount to chip in"
                                                                className="bg-[#F2F2F2] rounded-[46px] border-solid  border-[1px] border-[#334155] font-normal text-[#64748B] px-8 py-2"
                                                                onChange={(event) => {
                                                                    setInputField(
                                                                        event.target.value
                                                                    )
                                                                }}
                                                            />
                                                        </label>
                                                    </form>
                                                    <button
                                                        className="relative left-[5%]"
                                                        onClick={() => {
                                                            setShowFieldAmount(false)
                                                        }}
                                                    >
                                                        <Image
                                                            src={Close}
                                                            alt="close button"
                                                            className=""
                                                        />
                                                    </button>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <button
                                                        id="submit_fund"
                                                        onClick={async (event) =>
                                                            handleSubmitFund(event)
                                                        }
                                                        className="bg-[#22C55E] rounded-[49px] px-[32px] py-[10px] text-[#ffffff] font-semibold"
                                                    >
                                                        Fund
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
            </div>
        </div>
    )
}
