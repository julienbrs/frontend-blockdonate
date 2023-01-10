import { ConnectButton } from "web3uikit"
import Link from "next/link"
import React from "react"
import LpIllustration from "./assets/LpIllustration.png"

export default function Header() {
    return (
        <nav className="flex flex-row justify-center mt-[1%]">
            <div className="flex flex-row justify-between items-center pt-5 w-[85%] ">
                <h1 className="text-fieryorange text-[3.5em] font-normal">
                    Block<span className="font-extrabold">Donate</span>
                </h1>
                <ConnectButton id="MoralisConnect" moralisAuth={false} />
            </div>
        </nav>
    )
}
