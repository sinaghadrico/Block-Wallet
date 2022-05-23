import { useContract } from "utils/useContract";
import { WrappedERC20Token__factory, WrappedERC20Token } from "contracts/types";
import { BigNumber ,ContractTransaction ,ContractReceipt } from "ethers";
import { parseTokenValue ,toTokenValue } from "utils/convert";
import { Transfer } from "models/transfer";



export const useERC20Contract = (): WrappedERC20Token | undefined => {
    return useContract(WrappedERC20Token__factory.connect, process.env.tokenAddress);
};

export const useERC20 = () => {
    const contract = useERC20Contract();

    const getBalanceOf = (account: string) => {
        return new Promise<number>((resolve,reject) => {
            contract
                .balanceOf(account)
                .then((result: BigNumber) => {
                    const value = parseTokenValue(result);
                    resolve(value);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const getName = () => {
        return new Promise<string>((resolve,reject) => {
            contract
                .symbol()
                .then((result: string) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const transfer = (transferData:Transfer) => {
        return new Promise<ContractReceipt>((resolve, reject) => {
            const amountValue = toTokenValue(transferData.amount);

            contract
                ?.transfer(transferData.recipient, amountValue)
                ?.then((contractTransaction: ContractTransaction) => {
                    
                    contractTransaction
                        .wait(1)
                        .then((contractReceipt:ContractReceipt) => {
                           
                            resolve(contractReceipt);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                })
                .catch((error) => {
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
