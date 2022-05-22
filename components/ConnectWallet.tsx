import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "@ui-components/Button";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";
import { Accounts } from "./Accounts";
import { useWeb3React } from "@web3-react/core";

interface KeyValueBg {
    key: string;
    value: "purpleLighter" | "purple" | "pink" | "blue" | "green" | "gray";
}

export default function ConnectWallet({ type = "button", className }: { type: "button" | "icon"; className?: string }) {
    const { push } = useRouter();
    const { ENSNames, provider, accounts, isActive, connector } = useWeb3React();
    const WrapperConnectWallet = styled.div`
        text-align: right;
        min-width: 145px;
        cursor: pointer;
    `;

    return (
        <WrapperConnectWallet className={"flex items-center justify-end " + className}>
            {type === "button" ? (
                <Button
                    fontSize="16px"
                    maxWidth={isActive ? "311px" : "145px"}
                    color={"blue"}
                    onClick={() => {
                        isActive ? connector.deactivate() : push("/");
                    }}
                >
                    {isActive ? (
                        <span className="flex">
                            <span>
                                {" "}
                                <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />{" "}
                            </span>{" "}
                            Disconnect
                        </span>
                    ) : (
                        "Connect wallet"
                    )}
                </Button>
            ) : (
                <div
                    onClick={() => {
                        isActive && connector.deactivate();
                    }}
                >
                    {isActive ? (
                        <span className="flex">
                            {/* <Icon src="wallet" /> */}
                            <Text.span>
                                <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />{" "}
                            </Text.span>{" "}
                            <Text.p>Disconnect</Text.p>
                        </span>
                    ) : (
                        "Connect wallet"
                    )}
                </div>
            )}
        </WrapperConnectWallet>
    );
}
