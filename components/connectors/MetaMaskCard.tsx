import { useEffect } from "react";
import { hooks, metaMask } from "connectors/metaMask";
import { Accounts } from "components/Accounts";
import { Card } from "components/Card";
import { Chain } from "components/Chain";
import { ConnectWithSelect } from "components/ConnectWithSelect";
import { Status } from "components/Status";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";
const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function MetaMaskCard() {
    const chainId = useChainId();
    const accounts = useAccounts();
    const error = useError();
    const isActivating = useIsActivating();

    const isActive = useIsActive();

    const provider = useProvider();
    const ENSNames = useENSNames(provider);

    // attempt to connect eagerly on mount
    useEffect(() => {
        // void metaMask.connectEagerly();
    }, []);

    return (
        <Card>
            {/* <div> */}

            <span className="flex items-center">
                <Icon src="metamask" className="mr-2" />
                <Text.p> MetaMask </Text.p>
            </span>
            {/* <Status isActivating={isActivating} error={error} isActive={isActive} /> */}
            {/* <div style={{ marginBottom: "1rem" }} /> */}
            {/* <Chain chainId={chainId} /> */}
            {/* <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} /> */}
            {/* </div> */}
            {/* <div style={{ marginBottom: "1rem" }} /> */}
            <ConnectWithSelect
                connector={metaMask}
                chainId={chainId}
                isActivating={isActivating}
                error={error}
                isActive={isActive}
            />
        </Card>
    );
}
