
import Header from "@/app/_components/Header";
import styled from "styled-components";

const LayoutContainer = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
`;

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <LayoutContainer>
            <Header/>
            <div className={'inner-container'}>
                {children}
            </div>
        </LayoutContainer>
    );
}