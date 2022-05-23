import styled from "styled-components";
import type { CSSProperties } from "react";
import { memo } from "react";
interface BoxProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
    style?: CSSProperties;
}

const WrapperBox = memo(styled.div`
    width: fit-content;
    background: ${({ theme }) => theme.colors?.["secondary_10"]};
    border-radius: 48px;
    padding: 20px;
`);

export function Box({ children, className, style }: BoxProps) {
    return (
        <WrapperBox className={"w-full px-4 pt-16 " + className} style={style}>
            {children}
        </WrapperBox>
    );
}
