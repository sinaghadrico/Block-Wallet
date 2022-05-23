import styled from "styled-components";
import { Icon } from "@ui-components/Icon";
import { Box } from "@ui-components/Box";
import { Text } from "@ui-components/Text";
import MetaMaskCard from "components/connectors/MetaMaskCard";
import { useWeb3React } from "@web3-react/core";

export default function WalletOptions() {
    const { isActive, isActivating } = useWeb3React();

    const WrapperWalletOptions = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 447px;
        width: 100%;
        height: auto;
        min-height: 408px;
    `;

    return (
        <Box style={{ maxWidth: 447, width: "100%" }} className="m-auto">
            <WrapperWalletOptions>
                <Icon src="wallet" />
                {isActive ? (
                    <Text.h1 className="py-5">Wallet connect successful!</Text.h1>
                ) : isActivating ? (
                    <Text.h1 className="py-5">Connecting...</Text.h1>
                ) : (
                    <>
                        <Text.h2 className="pt-5">First, you need to </Text.h2>
                        <Text.h1 className="pb-5">Connect your wallet</Text.h1>
                    </>
                )}

                {!isActive && !isActivating && <MetaMaskCard />}
            </WrapperWalletOptions>
        </Box>
    );
}
