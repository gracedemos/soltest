import React from "react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

function Banner() {
    return (
        <div className="Banner bg-green-200 p-4 flex justify-between items-center">
            <h1 className="text-2xl">Sol Test</h1>
            <WalletMultiButton/>
        </div>
    )
}

export default Banner;