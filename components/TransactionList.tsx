import { Text } from "@ui-components/Text";
import { Box } from "@ui-components/Box";
import { Icon } from "@ui-components/Icon";
import ConnectWallet from "./ConnectWallet";
import { DetailsBox } from "./DetailsBox";
import { Table } from "@ui-components/Table";
import { useWeb3React } from "@web3-react/core";
import useWallet from "services/useWallet";
import useSWR from "swr";

export default function TransactionList() {
    const { account } = useWeb3React();
    const { getTransactionList } = useWallet(account);
    const { data, error } = useSWR(!!account ? [`getTransactionList-${account}`, account] : null, getTransactionList, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
    });
    const columns = {
        from: {
            label: "from",
            render: (value, record) => {
                return (
                    <Text.h2 className="flex">
                        {" "}
                        {value?.toLowerCase() === account?.toLowerCase() ? "Send" : "Receive"}
                    </Text.h2>
                );
            },
        },
        value: {
            label: "value",
            render: (value, record) => {
                return (
                    <Text.h2 className="flex">
                        {" "}
                        {value} ({record?.tokenSymbol})
                    </Text.h2>
                );
            },
        },
        timeStamp: {
            label: "timeStamp",
            render: (value, record) => {
                return <Text.h2 className="flex"> {value}</Text.h2>;
            },
        },
        to: {
            label: "to",
            render: (value, record) => {
                return (
                    <Text.h2 className="flex">
                        {" "}
                        <span style={{ maxWidth: 200, margin: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                            {value}
                        </span>{" "}
                    </Text.h2>
                );
            },
        },
    };

    return (
        <Box style={{ maxWidth: 447, width: "100%" }} className="h-screen ">
            <div className=" flex flex-col  md:flex-col lg:flex-row justify-center">
                <div className="box-left-header flex flex-col  md:flex-col lg:flex-row self-center py-5">
                    <ConnectWallet type="icon" />
                </div>
            </div>
            <div className=" flex flex-row justify-center">
                <DetailsBox />
            </div>

            <Table columns={columns} items={data} color="blue" />
        </Box>
    );
}
