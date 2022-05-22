/* eslint-disable @typescript-eslint/no-empty-function */
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import type { Response ,Transaction} from "models/transaction";
import { useERC20 } from "./useERC20Contract";
import useRequest from "./useRequest";


const setDigit = (value: number): number => {
    return Number(
        Number(value).toLocaleString("en", {
            useGrouping: false,
            minimumFractionDigits: 0,
            maximumFractionDigits: Number(value) > 1 ? 2 : 8,
        }),
    );
};
const parseTokenValue = (amount: BigNumber | string ): number => {
    try {
        return setDigit(parseFloat(formatUnits(amount, 16)) / 100);
    } catch (e) {
        return 0;
    }
};

export const parsTransaction = (transaction: Transaction): Transaction => {
  

 

    return {
        ...transaction,

        value:  ""+parseTokenValue(transaction?.value)

    };
};

const useWallet = (walletAddress:string) => {
    const { transfer ,getBalanceOf ,getName } = useERC20();
    const request = useRequest();
  
    const getTransactionList = () => {
          
        return new Promise((resolve: (response: Transaction[]) => void, reject) => {
            request.get(`?module=account&action=tokentx&address=${walletAddress}&contractaddress=${process.env.tokenAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=NRQFTEYABQSB88EGU69VU4A5JH7I2A2117`)
                .then((response: any) => {
                    
                const data :Transaction[]= response?.result?.map((transaction: Transaction) => {
                        const _transaction: Transaction = parsTransaction(transaction);
                        return _transaction;
                    }) || [];
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
                
        });
    };

    const Send = (recipient: string, amount: string) => {
        return transfer(recipient,amount);
    };
    const getBalance = () => {
        return getBalanceOf(walletAddress);
    };
    const getTokenName = () => {
        return getName();
    };

    return { getTransactionList, Send ,getBalance ,getTokenName};
};

export default useWallet;
