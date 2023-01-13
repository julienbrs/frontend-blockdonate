import Image from "next/image"
import githubLogo from "../components/assets/github2.png"
import { useState, useEffect } from "react"

export default function Footer() {
    const [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerHeight)
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <div className="flex flex-row justify-end mr-[2%] mt-[6%]">
            <div className="flex flex-row items-end justify-between w-1/2">
                <div>
                    <div className="font-medium text-[#334155]">Educational purpose</div>
                </div>
                <div>
                    <Image
                        src={githubLogo}
                        width={screenWidth / 20}
                        alt="Github Logo"
                        href="https://github.com/julienbrs"
                    />
                </div>
            </div>
        </div>
    )
}
