import Head from "next/head";
import { Box } from "@ui-components/Box";
import { Text } from "@ui-components/Text";
import { Input } from "@ui-components/Input";
import { Button } from "@ui-components/Button";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useWallet from "services/useWallet";
import { useWeb3React } from "@web3-react/core";
import { SuccessBox } from "components/SuccessBox";
import { formatNumberWithCommas, isValidNumber, parseValueToNumber } from "utils/number";
import { Transfer } from "models/transfer";
import { ContractReceipt } from "ethers";
import useSWR from "swr";
import { getErrorMessage } from "utils/errorDic";
export default function Send() {
    const { push } = useRouter();
    const { isActive, account } = useWeb3React();
    const { transferToken, getBalance } = useWallet(account);
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState();
    const [txHash, setTXHash] = useState<string>();

    const { data: balance } = useSWR(!!account ? [`getBalance-${account}`, account] : null, getBalance);

    const [transferForm, setTransferForm] = useState<Transfer>({
        recipient: "",
        amount: "1",
    });
    useEffect(() => {
        !isActive && !account && handleCancel();
    }, [isActive, account]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value: _value } = event.target;
        const value = parseValueToNumber("" + _value);
        const isValid = isValidNumber("" + _value);

        if (name === "amount") {
            isValid && setTransferForm({ ...transferForm, [name]: value });
        } else {
            setTransferForm({ ...transferForm, [name]: _value });
        }
        error && setError(null);
    };
    const handleSubmit = () => {
        setLoading(true);
        setError(null);

        transferToken(transferForm)
            ?.then((contractReceipt: ContractReceipt) => {
                setTXHash(contractReceipt?.transactionHash);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(getErrorMessage(error));
            });
    };
    const handleCancel = () => {
        push("/");
    };
    return (
        <div className="flex min-h-screen flex-col items-center content-center   ">
            <Head>
                <title>BlockWallet | Send</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Box
                style={{ maxWidth: 447, width: "100%", minHeight: 500 }}
                className="flex flex-col w-full   justify-around self-center m-auto h-full "
            >
                {txHash ? (
                    <SuccessBox txHash={txHash} />
                ) : (
                    <form
                        style={{ minHeight: 500 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col  w-full h-full   justify-around self-center"
                    >
                        <div className="flex flex-col  w-full h-full   ">
                            <Text.h1>Send Token</Text.h1>
                            <div className="flex flex-col w-full  md:flex-col lg:flex-row justify-center self-center">
                                <Input
                                    label="Recipient"
                                    type="string"
                                    value={transferForm.recipient}
                                    name="recipient"
                                    placeholder="Enter Public Address"
                                    onChange={handleChange}
                                    className="my-3"
                                />
                            </div>
                            <div className="flex flex-col w-full  md:flex-col lg:flex-row justify-center self-center">
                                <Input
                                    label="Amount"
                                    type="string"
                                    value={formatNumberWithCommas(transferForm.amount)}
                                    name="amount"
                                    placeholder="Enter the Amount of Ether"
                                    onChange={handleChange}
                                    className="my-3"
                                />
                            </div>
                            {+transferForm.amount > balance && (
                                <Text.h5 color="red">You don't have sufficient amount of Token</Text.h5>
                            )}
                            {+transferForm.amount === 0 && <Text.h5 color="red">Amount must be greater than 0</Text.h5>}
                        </div>
                        {error && <Text.h5 color="red">{error || ""}</Text.h5>}

                        <div className="grid grid-cols-2 gap-5">
                            <Button
                                fontSize="16px"
                                color="gray"
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                fontSize="16px"
                                color="blue"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={loading || +transferForm.amount > balance || +transferForm.amount === 0}
                            >
                                {loading ? "Loading..." : "Send"}
                            </Button>
                        </div>
                    </form>
                )}
            </Box>
        </div>
    );
}
Send.getLayout = function getLayout(page) {
    return page;
};
