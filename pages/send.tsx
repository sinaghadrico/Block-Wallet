import Head from "next/head";
import { Box } from "@ui-components/Box";
import { Input } from "@ui-components/Input";
import { Button } from "@ui-components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useWallet from "services/useWallet";
import { useWeb3React } from "@web3-react/core";
import { SuccessBox } from "components/SuccessBox";
import { formatNumberWithCommas, isValidNumber, parseValueToNumber } from "utils/number";
export default function Send() {
    const { push } = useRouter();
    const { isActive, account } = useWeb3React();
    const { Send } = useWallet(account);
    const [loading, setLoading] = useState<boolean>();
    const [txHash, setTXHash] = useState<string>();

    const [form, setForm] = useState<any>({
        recipient: "0xd7D2A1D3C343B5aBE026aE1D32602D30937a6325",
        amount: "2",
    });
    useEffect(() => {
        !isActive && !account && handleCancel();
    }, [isActive, account]);

    const handleChange = (event: any) => {
        const { name, value: _value } = event.target;
        const value = parseValueToNumber("" + _value);
        const isValid = isValidNumber("" + _value);

        if (name === "amount") {
            isValid && setForm({ ...form, [name]: value });
        } else {
            setForm({ ...form, [name]: _value });
        }
    };
    const handleSubmit = () => {
        setLoading(true);
        Send(form.recipient, form.amount)
            ?.then((transaction: any) => {
                setTXHash(transaction?.hash);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
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
                className="flex flex-col   justify-around self-center m-auto"
            >
                {txHash ? (
                    <SuccessBox txHash={txHash} />
                ) : (
                    <>
                        <div className="flex flex-col  w-full    justify-center self-center">
                            <div className="flex flex-col w-full  md:flex-col lg:flex-row justify-center self-center">
                                <Input
                                    type="string"
                                    value={form.recipient}
                                    name="recipient"
                                    placeholder="Enter Public Address"
                                    onChange={handleChange}
                                    className="my-3"
                                />
                            </div>
                            <div className="flex flex-col w-full  md:flex-col lg:flex-row justify-center self-center">
                                <Input
                                    type="string"
                                    value={formatNumberWithCommas(form.amount)}
                                    name="amount"
                                    placeholder="Enter the Amount of Ether"
                                    onChange={handleChange}
                                    className="my-3"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <Button fontSize="16px" color="gray" onClick={handleCancel} disabled={loading}>
                                Cancel
                            </Button>
                            <Button fontSize="16px" color="blue" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Loading..." : "Send"}
                            </Button>
                        </div>
                    </>
                )}
            </Box>
        </div>
    );
}
Send.getLayout = function getLayout(page) {
    return page;
};
