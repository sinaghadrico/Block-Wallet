import styled from "styled-components";
import type { ReactNode, HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
    size?: "xs" | "sm" | "tiny" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    color?:
        | "primary"
        | "secondary"
        | "purple"
        | "purpleLighter"
        | "purpleDark"
        | "purpleLight"
        | "pink"
        | "pinkDark"
        | "blue"
        | "green"
        | "red"
        | "yellow";
    children: JSX.Element | JSX.Element[] | ReactNode;
    type?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
    className?: string;
}
interface TextInlineProps extends HTMLAttributes<HTMLElement> {
    size?: "xs" | "sm" | "tiny" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
    color?:
        | "primary"
        | "secondary"
        | "purple"
        | "purpleLighter"
        | "purpleDark"
        | "purpleLight"
        | "pink"
        | "pinkDark"
        | "blue"
        | "green"
        | "red"
        | "yellow";
    children: JSX.Element | JSX.Element[] | ReactNode;
    className?: string;
}

export function Text({ size = "base", color = "primary", children, type = "p", ...restProps }: TextProps) {
    const CustomText = styled[type]`
        font-size: ${({ theme }) => theme.fonts?.[size]?.["size"]};
        font-weight: ${({ theme }) => theme.fonts?.[size]?.["weight"]};
        font-style: ${({ theme }) => theme.fonts?.[size]?.["style"]};
        color: ${({ theme }) => theme.colors?.[color]};
    `;
    return <CustomText {...restProps}>{children}</CustomText>;
}

Text.p = function p({ size = "base", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="p">
            {children}
        </Text>
    );
};
Text.h1 = function h1({ size = "xl", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h1">
            {children}
        </Text>
    );
};
Text.h2 = function h2({ size = "lg", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h2">
            {children}
        </Text>
    );
};
Text.h3 = function h3({ size = "base", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h3">
            {children}
        </Text>
    );
};
Text.h4 = function h4({ size = "tiny", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h4">
            {children}
        </Text>
    );
};

Text.h5 = function h5({ size = "sm", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h5">
            {children}
        </Text>
    );
};
Text.h6 = function xs({ size = "base", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="h6">
            {children}
        </Text>
    );
};
Text.span = function span({ size = "base", color = "primary", children, ...restProps }: TextInlineProps) {
    return (
        <Text {...restProps} size={size} color={color} type="span">
            {children}
        </Text>
    );
};
