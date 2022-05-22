import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";

interface KeyValue {
    key: string;
    value: string;
}

interface CoinLabelProps {
    color?: "purpleLighter" | "green";
    coin: KeyValue;
    onClick: MouseEventHandler<HTMLDivElement>;
}
export default function CoinLabel({ color = "purpleLighter", coin, onClick }: CoinLabelProps) {
    const CoinLabel = styled.span`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 5px;
        max-width: 160px;
        width: 100%;
        height: 44px;
        background: ${({ theme }) => theme.colors?.["secondary_10"]};
        color: ${({ theme }) => theme.colors?.["secondary"]};
        border-radius: 16px;
        cursor: pointer;
        svg {
            margin: 0 5px;
        }
        margin: 5px 2px;
    `;

    return (
        <CoinLabel key={coin?.key} onClick={onClick}>
            <Icon src={"btc"} width={25} height={25} /> {coin?.value}{" "}
            <Text.p color={color} className="px-2 underline">
                Change
            </Text.p>
        </CoinLabel>
    );
}
