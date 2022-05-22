import styled from "styled-components";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fontSize?: string;
    maxWidth?: string;
    color?: "purpleLighter" | "purple" | "pink" | "blue" | "green" | "gray";
}

export function Button({
    fontSize = "24px",
    maxWidth = "268px",
    color = "purple",
    children,
    ...restProps
}: ButtonProps) {
    const CustomButton = styled.button`
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        cursor: pointer;
        font-style: normal;
        font-weight: 700;
        font-size: ${fontSize};
        line-height: 33px;
        max-width: ${maxWidth};
        width: 100%;
        height: 56px;
        text-align: center;
        border-radius: 32px;
        padding: 0 15px;

        box-shadow: 2px 4px 2px ${({ theme }) => theme.buttons?.[color]?.["filled"]?.["boxShadow"]};
        color: ${({ theme }) => theme.buttons?.[color]?.["filled"]?.["color"]};
        background: ${({ theme }) => theme.buttons?.[color]?.["filled"]?.["background"]};
        > span {
            overflow: hidden;
        }

        &:hover {
            box-shadow: 2px 4px 2px ${({ theme }) => theme.buttons?.[color]?.["outline"]?.["boxShadow"]};
            color: ${({ theme }) => theme.buttons?.[color]?.["outline"]?.["color"]};
            background: ${({ theme }) => theme.buttons?.[color]?.["outline"]?.["background"]};
        }
    `;

    return <CustomButton {...restProps}>{children}</CustomButton>;
}
