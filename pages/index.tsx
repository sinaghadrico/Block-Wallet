import Head from "next/head";
import { Text } from "@ui-components/Text";
import WalletOptions from "components/WalletOptions";
import { useWeb3React } from "@web3-react/core";
import TransactionList from "components/TransactionList";

export default function Home() {
    const { isActive } = useWeb3React();

    return (
        <div className="flex min-h-screen flex-col items-center content-center  ">
            <Head>
                <title>BlockWallet | Home</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            {!isActive ? (
                <WalletOptions />
            ) : (
                <div className="flex flex-col  md:flex-col lg:flex-row self-center m-auto ">
                    <TransactionList />
                </div>
            )}
        </div>
    );
}
Home.getLayout = function getLayout(page) {
    return page;
};
