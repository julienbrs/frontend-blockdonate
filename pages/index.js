import { React } from "react"
import Image from "next/image"
import Link from "next/link"
import LpIllustration from "../components/assets/LpIllustration.png"

export default function Home() {
    return (
        <div className="flex flex-row justify-end ">
            <div className="flex flex-row w-[92.5%] items-center justif-between">
                <div className="w-[40%] mr-[3%]">
                    <div>
                        <h1 className="text-[3em] text-[#0F172A] font-bold leading-[125%] ">
                            A secure and transparent Donation Platform
                        </h1>
                    </div>
                    <div className="text-lightgrey font-medium text-[1.25em] py-[1.5em]">
                        Support the development of innovative projects and causes that matter to
                        you. <br /> Our current focus is on the French Tarot project, an exciting
                        new initiative that aims to bring the traditional game of tarot to the
                        blockchain. By making a donation through BlockDonate, you can help fund the
                        development of this innovative project and be a part of bringing a beloved
                        cultural tradition into the modern age.
                    </div>
                    <Link
                        href="/home"
                        id="button_discover_lp"
                        className="px-10 py-3 text-[#ffffff] font-bold mr-[5%] "
                    >
                        Discover
                    </Link>
                    <Link
                        id="button_github"
                        href="https://github.com/julienbrs"
                        className="px-9 py-3 text-[#F97316] bg-[#F1F5F9] font-bold  rounded-[49px] "
                    >
                        View Code
                    </Link>
                </div>
                <div className="flex flex-col justify-end items-end h-[100%] ">
                    <Image
                        id="img_lp"
                        unoptimized
                        src={LpIllustration}
                        alt="Image of the NFT"
                        className=" "
                    />
                </div>
            </div>
        </div>
    )
}
