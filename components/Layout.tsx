import styled from "styled-components";
import Loading from "components/Loading";
import { useRouter } from "next/router";
import Router from "next/router";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
    const { asPath } = useRouter();

    const [loading, SetLoading] = useState(false);

    useEffect(() => {
        Router.events.on("routeChangeStart", (url) => {
            SetLoading(true);
        });

        Router.events.on("routeChangeComplete", (url) => {
            SetLoading(false);
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });
        });
    }, []);

    const Container = styled.div`
        display: flex;
        flex-direction: column;
        background-color: ${({ theme }) => theme.colors?.["primary"]};
        background-repeat: no-repeat;
        background-size: cover;
        padding: 0px;
        min-height: 100vh;
    `;

    return (
        <Container>
            <main>
                {/* <Loading loading={loading} /> */}
                <Transition
                    appear={true}
                    show={!loading}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-10"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-10"
                >
                    {children}
                </Transition>
            </main>
        </Container>
    );
}
