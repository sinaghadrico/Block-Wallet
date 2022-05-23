import { Text } from "@ui-components/Text";
import { Box } from "@ui-components/Box";
import { DetailsBox } from "./DetailsBox";
import { Table } from "@ui-components/Table";
import { useWeb3React } from "@web3-react/core";
import useWallet from "services/useWallet";
import useSWR from "swr";
import { fromUnixTime, format } from "date-fns";

export default function TransactionList() {
    const { account } = useWeb3React();
    const { getTransactionList } = useWallet(account);
    const { data } = useSWR(!!account ? [`getTransactionList-${account}`, account] : null, getTransactionList);
    const columns = {
        from: {
            label: "Type",
            render: (value) => {
                return (
                    <Text.p className="flex">
                        {" "}
                        {value?.toLowerCase() === account?.toLowerCase() ? "Send" : "Receive"}
                    </Text.p>
                );
            },
        },
        value: {
            label: "Value",
            render: (value, record) => {
                return (
                    <Text.p className="flex">
                        {" "}
                        {value} ({record?.tokenSymbol})
                    </Text.p>
                );
            },
        },
        timeStamp: {
            label: "Time",
            render: (value) => {
                const result = fromUnixTime(value);

                return (
                    <Text.p className="flex">
                        <span>
                            {" "}
                            <> {format(result, "yyyy-MM-dd   HH:mm:ss")}</>
                        </span>
                    </Text.p>
                );
            },
        },
        to: {
            label: "To",
            render: (value) => {
                return (
                    <Text.p className="flex">
                        {" "}
                        <span style={{ maxWidth: 200, margin: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
                            {value}
                        </span>{" "}
                    </Text.p>
                );
            },
        },
    };

    return (
        <Box>
            <div className=" flex flex-row justify-center">
                <DetailsBox />
            </div>
            <Table columns={columns} items={data || []} color="blue" />
        </Box>
    );
}
