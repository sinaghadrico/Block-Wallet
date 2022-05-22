import Head from "next/head";
import { Text } from "@ui-components/Text";
import { Box } from "@ui-components/Box";
import { Input } from "@ui-components/Input";
import { Button } from "@ui-components/Button";
import { useWeb3React } from "@web3-react/core";

import { useState } from "react";
import { useERC20 } from "services/useERC20Contract";
import { useRouter } from "next/router";
export default function Send() {
    const { push } = useRouter();
    const { isActive, account } = useWeb3React();
    const { transfer } = useERC20();

    const [form, setForm] = useState<any>({
        recipient: "0xd7D2A1D3C343B5aBE026aE1D32602D30937a6325",
        amount: "2",
    });

    const handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };
    const handleSubmit = () => {
        transfer(form.recipient, form.amount);
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
                className="flex flex-col   justify-around self-center h-screen"
            >
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
                            value={form.amount}
                            name="amount"
                            placeholder="Enter the Amount of Ether"
                            onChange={handleChange}
                            className="my-3"
                        />
                    </div>
                </div>

                <div className="flex flex-col   w-full   md:flex-col lg:flex-row justify-center self-center">
                    <Button fontSize="16px" color="gray" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button fontSize="16px" color="blue" onClick={handleSubmit}>
                        Send
                    </Button>
                </div>
            </Box>{" "}
        </div>
    );
}
Send.getLayout = function getLayout(page) {
    return page;
};
