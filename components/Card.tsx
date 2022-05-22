import styled from "styled-components";

export function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
    const CustomCard = styled.div`
        display: flex;
        justify-content: space-between;
        max-width: 347px;
        width: 100%;
        height: 56px;
        background: ${({ theme }) => theme.colors?.["secondary_10"]};
        border-radius: 16px;
        padding: 10px;
        margin: 5px 0;
    `;
    return <CustomCard>{children}</CustomCard>;
}
