import { useEffect } from "react";
import { coinbaseWallet, hooks } from "connectors/coinbaseWallet";
import { Accounts } from "components/Accounts";
import { Card } from "components/Card";
import { Chain } from "components/Chain";
import { ConnectWithSelect } from "components/ConnectWithSelect";
import { Status } from "components/Status";

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

export default function CoinbaseWalletCard() {
    const chainId = useChainId();
    const accounts = useAccounts();
    const error = useError();
    const isActivating = useIsActivating();

    const isActive = useIsActive();

    const provider = useProvider();
    const ENSNames = useENSNames(provider);

    // attempt to connect eagerly on mount
    useEffect(() => {
        void coinbaseWallet.connectEagerly();
    }, []);

    return (
        <Card>
            <div>
                <b>Coinbase Wallet</b>
                <Status isActivating={isActivating} error={error} isActive={isActive} />
                <div style={{ marginBottom: "1rem" }} />
                <Chain chainId={chainId} />
                <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
            </div>
            <div style={{ marginBottom: "1rem" }} />
            <ConnectWithSelect
                connector={coinbaseWallet}
                chainId={chainId}
                isActivating={isActivating}
                error={error}
                isActive={isActive}
            />
        </Card>
    );
}
