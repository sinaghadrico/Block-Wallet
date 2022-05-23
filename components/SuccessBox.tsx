import styled from "styled-components";
import { Text } from "@ui-components/Text";
import { Icon } from "@ui-components/Icon";
import { Button } from "@ui-components/Button";
import { useRouter } from "next/router";

import TransactionLink from "components/TransactionLink";

const WrapperSuccessBox = styled.div`
    max-width: 379px;
    @media (min-width: 760px) {
        min-width: 360px;
    }
    @media (max-width: 760px) {
        min-width: 288px;
    }
    width: 100%;
    height: 380px;
    background: ${({ theme }) => theme.colors?.["secondary_10"]};
    border: 2px solid ${({ theme }) => theme.colors?.["secondary_10"]};
    box-sizing: border-box;
    backdrop-filter: blur(16px);
    border-radius: 48px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

export function SuccessBox({ txHash }: { txHash: string }) {
    const { push } = useRouter();

    return (
        <WrapperSuccessBox className="m-auto">
            <Icon src="trade" />
            <Text.h1 className="py-3 text-center">Success.</Text.h1>
            <Text.h3 className="py-3 text-center">You've successfully sent your funds.</Text.h3>
            <Text.span color="blue">
                <TransactionLink hash={txHash} />
            </Text.span>{" "}
            <Button
                onClick={() => {
                    push("/");
                }}
                color="gray"
            >
                Done
            </Button>
        </WrapperSuccessBox>
    );
}
