import "../styles/globals.css"
import Head from "next/head"
import React from "react"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import { NotificationProvider } from "web3uikit"
import PropTypes from "prop-types"

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>BlockDonate</title>
                <meta name="description" content="A decentralized donation platform" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="next-head-count" content="2" />
                <lifirefnk rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}
