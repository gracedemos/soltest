import React, {useEffect, useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

function AccountInfo() {
    const {connection} = useConnection();
    const {publicKey} = useWallet();
    const [balance, setBalance] = useState(0);
    const [samoBalance, setSamoBalance] = useState(0);
    const [address, setAddress] = useState("");
    const samoPublicKey = new PublicKey("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU");

    useEffect(() => {
        if (!connection || !publicKey) {
            setBalance(0);
            setSamoBalance(0);
            setAddress("");
            return;
        }

        connection.getAccountInfo(publicKey)
            .then(info => {
                if (info?.lamports === undefined) {
                    return;
                }
                setBalance(info?.lamports / LAMPORTS_PER_SOL);

                setAddress(publicKey.toString());
            });

        connection.getTokenAccountsByOwner(publicKey, {mint: samoPublicKey})
            .then(result => {
                connection.getTokenAccountBalance(result.value[0].pubkey)
                    .then(bal => {
                        if (bal.value.uiAmount === null) {
                            return;
                        }
                        setSamoBalance(bal.value.uiAmount);
                    })
            })
    }, [connection, publicKey]);

    return (
        <div className="AccountInfo bg-green-300 w-1/3 p-6 rounded m-auto">
            <input type="text" placeholder="Address" value={address} className="p-4 rounded w-full mb-4"/>
            <div className="bg-green-200 rounded p-4 flex justify-between mb-4">
                <h1 className="flex items-center">
                    <img src="/sol.png" alt="" className="w-5 h-5 m-1"/>
                    SOL
                </h1>
                <h1>{balance}</h1>
            </div>
            <div className="bg-green-200 rounded p-4 flex justify-between">
                <h1 className="flex items-center">
                    <img src="/samo.webp" alt="" className="w-5 h-5 m-1"/>
                    SAMO
                </h1>
                <h1>{samoBalance}</h1>
            </div>
        </div>
    )
}

export default AccountInfo;