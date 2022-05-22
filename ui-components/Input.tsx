import styled from "styled-components";
import type { InputHTMLAttributes } from "react";
import { memo } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CustomWrapperInput = memo(styled.div`
    width: 100%;
    position: relative;
`);

const CustomInput = memo(styled.input`
    font-size: ${({ theme }) => theme.fonts?.["sm"]?.["size"]};
    font-weight: ${({ theme }) => theme.fonts?.["sm"]?.["weight"]};
    font-style: ${({ theme }) => theme.fonts?.["sm"]?.["style"]};
    line-height: 19px;
    color: ${({ theme }) => theme.colors?.["secondary_50"]};
    border: 2px solid ${({ theme }) => theme.colors?.["secondary_25"]};
    border-radius: 8px;
    width: 100%;
    height: 48px;
    padding: 0 15px;
    :focus {
        outline: none;
        border: 2px solid ${({ theme }) => theme.colors?.["primary"]};
    }
    background: transparent;
`);
export function Input({ className, ...restProps }: InputProps) {
    return (
        <CustomWrapperInput className={className}>
            <CustomInput autoComplete="off" {...restProps} />
        </CustomWrapperInput>
    );
}
