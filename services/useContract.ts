import { useMemo } from "react";
import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export function useContract<C>(
    connector: (address: string, signerOrProvider: Signer | Provider) => C,
    contractAddress: string,
): C | undefined {
    const { provider, account, isActive, error } = useWeb3React();

    // call the factory connector
    return useMemo(
        () =>
            contractAddress && contractAddress !== "0x00" && provider && isActive && !error
                ? connector(contractAddress, account ? provider : provider)
                : undefined,
        [provider, isActive, error, connector, contractAddress, account],
    );
}
