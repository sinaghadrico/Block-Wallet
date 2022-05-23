
import type { Transaction} from "models/transaction";
import { parseTransaction } from "utils/convert";
import { useERC20 } from "./useERC20Contract";
import useRequest from "utils/useRequest";
import { Transfer } from "models/transfer";




const useWallet = (walletAddress:string) => {
    const { transfer ,getBalanceOf ,getName } = useERC20();
    const request = useRequest();
  
    const getTransactionList = () => {
          
        return new Promise((resolve: (response: Transaction[]) => void, reject) => {
            request.get(`?module=account&action=tokentx&address=${walletAddress}&contractaddress=${process.env.tokenAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=NRQFTEYABQSB88EGU69VU4A5JH7I2A2117`)
                .then((response: any) => {
                    
                const data :Transaction[]= response?.result?.map((transaction: Transaction) => parseTransaction(transaction)) || [];
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
                
        });
    };

    const transferToken = (transferData:Transfer) => {
        return transfer(transferData);
    };
    const getBalance = () => {
        return getBalanceOf(walletAddress);
    };
    const getTokenName = () => {
        return getName();
    };

    return { getTransactionList, transferToken ,getBalance ,getTokenName};
};

export default useWallet;
