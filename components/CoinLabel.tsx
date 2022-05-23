import { MouseEventHandler } from "react";
import styled from "styled-components";
import { Icon } from "@ui-components/Icon";

interface CoinLabelProps {
    color?: "purpleLighter" | "green";
    coin: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}
export default function CoinLabel({ coin, onClick }: CoinLabelProps) {
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
        <CoinLabel key={coin} onClick={onClick}>
            <Icon src={"eth"} width={25} height={25} /> {coin}
        </CoinLabel>
    );
}
