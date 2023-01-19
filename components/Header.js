import { ConnectButton } from "web3uikit"
import Link from "next/link"
import React from "react"
import LpIllustration from "./assets/LpIllustration.png"

export default function Header() {
    return (
        <nav className="flex flex-row justify-center mt-[1%] ">
            <div className="flex flex-row justify-between items-center pt-5 w-[85%] wrapper-header ">
                <Link className="text-fieryorange text-[3.5em] font-normal" href="/">
                    Block<span className="font-extrabold">Donate </span>
                </Link>
                <ConnectButton id="MoralisConnect" moralisAuth={false} />
            </div>
        </nav>
    )
}
