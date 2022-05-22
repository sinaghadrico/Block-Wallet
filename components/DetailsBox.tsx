import styled from "styled-components";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";
import { Button } from "@ui-components/Button";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import useWallet from "services/useWallet";
import useSWR from "swr";

const WrapperDetailsBox = styled.a`
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
    const { data: balance } = useSWR(!!account ? [`getBalance-${account}`, account] : null, getBalance, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });
    const { data: tokenName } = useSWR(!!account ? [`getTokenName`] : null, getTokenName, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });
    return (
        <WrapperDetailsBox
            href="/send"
            onClick={(e) => {
                e.preventDefault();
                push("/send");
            }}
        >
            <Icon src="wallet" />
            <Text.h3 className="pt-10 pb-1 text-center">Wallet</Text.h3>
            <Text.h1 className="py-1 text-center">
                Balance : {balance}({tokenName}){" "}
            </Text.h1>

            <Button
                onClick={() => {
                    push("/send");
                }}
                color="blue"
            >
                Send
            </Button>
        </WrapperDetailsBox>
    );
}
