import { ChainIdNotAllowedError } from "@web3-react/store";

const ErrorMessageList: any = [
    { key: "3", value: "transfer amount exceeds balance" },
];



export function getErrorMessageDic(code: string) {
    const errorMessage = ErrorMessageList?.find((e: any) => code?.includes(e?.key))
        ? ErrorMessageList?.find((e: any) => code?.includes(e?.key)).value
        : "An unknown error occurred.";

    return errorMessage;
}

export function getErrorMessage(error: any) {
    
    if (error instanceof ChainIdNotAllowedError) {
        return "You're connected to an unsupported network.";
    } else {

        const stringifyError = JSON.stringify(error);
        const parseError = JSON.parse(stringifyError);
    
        const _error = parseError?.data?.data
            ? getErrorMessageDic(parseError?.data?.data)
            :
            parseError?.error?.message ||
            parseError?.reason ||
            
              "An unknown error occurred. Check the console for more details.";

        if (error.message?.includes("JsonRpcEngine")) {
            return "An Blockchain error occurred.";
        } else if (error.message?.includes("layer") || error.message?.includes("user closed popup")) {
            return null;
        } else {
            return _error;
        }
    }
}
