import { useContract } from "./useContract";

import { WrappedERC20Token__factory, WrappedERC20Token } from "contracts/types";

import { formatUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";

import { useWeb3React } from "@web3-react/core";

const setDigit = (value: number): number => {
    return Number(
        Number(value).toLocaleString("en", {
            useGrouping: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: Number(value) > 1 ? 2 : 8,
        }),
    );
};
const parseTokenValue = (amount: BigNumber): number => {
    try {
        return setDigit(parseFloat(formatUnits(amount, 16)) / 100);
    } catch (e) {
        return 0;
    }
};
const toTokenValue = (amount: string): BigNumber => {
    const dotIndex = amount?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? amount?.toString()?.substring(dotIndex + 1).length : 0;

    const amountTemp = ~~(Number(amount) * Math.pow(10, realDecimal));
    return BigNumber.from(10)
        .pow(18 - realDecimal)
        .mul(amountTemp);
};

export const useERC20Contract = (): WrappedERC20Token | undefined => {
    return useContract(WrappedERC20Token__factory.connect, process.env.tokenAddress);
};

export const useERC20 = () => {
    const contract = useERC20Contract();

    const getBalanceOf = (account: string) => {
        return new Promise<number>((resolve) => {
            contract
                .balanceOf(account)
                .then((balance: BigNumber) => {
                    const value = parseTokenValue(balance);
                    resolve(value);
                })
                .catch((error: any) => {
                    resolve(0);
                });
        });
    };
    const getName = () => {
        return new Promise<string>((resolve) => {
            contract
                .symbol()
                .then((name: string) => {
                    resolve(name);
                })
                .catch((error: any) => {
                    resolve("");
                });
        });
    };
    const transfer = (recipient: string, amount: string) => {
        return new Promise<number>((resolve, reject) => {
            const amountValue = toTokenValue(amount);

            contract
                ?.transfer(recipient, amountValue)
                ?.then((transactionTransfer: any) => {
                    transactionTransfer
                        .wait(1)
                        .then(() => {
                            resolve(transactionTransfer);
                        })
                        .catch((error: any) => {
                            reject(error);
                        });
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    };
    return {
        getBalanceOf,
        transfer,
        getName,
        contract: contract || false,
    };
};
