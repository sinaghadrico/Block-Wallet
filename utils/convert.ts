import { formatUnits } from "@ethersproject/units";
import { BigNumber  } from "ethers";
import type { Transaction} from "models/transaction";

const expToken = BigNumber.from(10).pow(18);
const expPrice = BigNumber.from(10).pow(8);


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

const toTokenValue = (amount: string): BigNumber => {
    const dotIndex = amount?.toString()?.indexOf(".");
    const realDecimal = dotIndex > 0 ? amount?.toString()?.substring(dotIndex + 1).length : 0;

    const amountTemp = ~~(Number(amount) * Math.pow(10, realDecimal));
    return BigNumber.from(10)
        .pow(18 - realDecimal)
        .mul(amountTemp);
};

export const parseTransaction = (transaction: Transaction): Transaction => {
    return {
        ...transaction,

        value:  ""+parseTokenValue(transaction?.value)

    };
};
export {
    toTokenValue,
    parseTokenValue,
    expToken,
    expPrice,
    setDigit,
};
