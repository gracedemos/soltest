import React from 'react';
import {TrustWalletAdapter} from "@solana/wallet-adapter-trust";
import Banner from "./Banner";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import AccountInfo from "./AccountInfo";
import {BraveWalletAdapter} from "@solana/wallet-adapter-brave";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
    const endpoint = "http://api.metaplex.solana.com/";
    const wallets = [
        new TrustWalletAdapter(),
        new BraveWalletAdapter()
    ];

    return (
      <div className="App h-screen flex flex-col">
          <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets}>
                  <WalletModalProvider>
                      <Banner/>
                      <AccountInfo/>
                  </WalletModalProvider>
              </WalletProvider>
          </ConnectionProvider>
      </div>
  );
}

export default App;
