import styled from "styled-components";
import type { ReactNode, FC } from "react";
import { memo } from "react";
interface BoxProps {
    children: ReactNode;
    className?: string;
    style?: any;
}

const WrapperBox = memo(styled.div`
    width: fit-content;
    background: ${({ theme }) => theme.colors?.["black_secondary"]};
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
