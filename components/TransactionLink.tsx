import { FC } from "react";
import styled from "styled-components";
export interface TransactionLinkProps {
    hash: string;
    transactionEndpoint?: string;
    type?: "full" | "half";
}

const CustomTransactionLink = styled.a`
    display: flex;
    width: max-content;
`;
const CustomTransactionLinkHalf = styled.span`
    max-width: 57px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
`;
const CustomTransactionLinkFull = styled.span`
    max-width: 57px;
`;
const TransactionLink: FC<TransactionLinkProps> = ({
    hash,
    transactionEndpoint = "https://rinkeby.etherscan.io/tx",
    type = "half",
}: TransactionLinkProps) => {
    const _hash = hash.slice(0, 66);
    const fullAddress =
        _hash && _hash?.length ? `${_hash.substr(0, 5)}...${_hash.substr(_hash.length - 4, _hash.length - 1)}` : null;
    return (
        <CustomTransactionLink
            href={`${transactionEndpoint}/${_hash}`}
            target="_blank"
            rel="noreferrer"
            aria-label={"tx-address"}
        >
            View on Etherscan :
            <span>
                {type === "half" ? (
                    <CustomTransactionLinkHalf className="underline">{_hash}</CustomTransactionLinkHalf>
                ) : (
                    <CustomTransactionLinkFull className="underline">{fullAddress}</CustomTransactionLinkFull>
                )}
            </span>
        </CustomTransactionLink>
    );
};

export default TransactionLink;
