import styled from "styled-components";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";
import { Button } from "@ui-components/Button";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useWallet from "services/useWallet";
import useSWR from "swr";
import { addCustomToken } from "chains";
import ConnectWallet from "./ConnectWallet";

const WrapperDetailsBox = styled.div`
    max-width: 379px;
    min-width: 360px;
    width: 100%;
    height: 380px;
    background: ${({ theme }) => theme.colors?.["secondary_10"]};
    border: 2px solid ${({ theme }) => theme.colors?.["secondary_10"]};
    box-sizing: border-box;
    backdrop-filter: blur(16px);
    border-radius: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
`;

export function DetailsBox() {
    const { push } = useRouter();
    const { account } = useWeb3React();
    const { getBalance, getTokenName } = useWallet(account);
    const { data: balance } = useSWR(!!account ? [`getBalance-${account}`, account] : null, getBalance);
    const { data: tokenName } = useSWR(!!account ? [`getTokenName`] : null, getTokenName);
    return (
        <WrapperDetailsBox>
            <Icon src="wallet" />
            <ConnectWallet type="icon" className="pt-5 " />
            <Text.h1 className="py-3 text-center">
                Balance : {balance}({tokenName}){" "}
            </Text.h1>
            <Button
                onClick={() => {
                    push("/send");
                }}
                color="blue"
            >
                Send Token
            </Button>
            <Text.h4 color="secondary" className="pt-5">
                haven't ({tokenName}) token on your wallet ?{" "}
            </Text.h4>
            <Text.span color="yellow" className="underline" onClick={addCustomToken}>
                Please click to add
            </Text.span>{" "}
        </WrapperDetailsBox>
    );
}
