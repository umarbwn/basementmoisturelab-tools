import Header from "@/app/_components/Header";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={'min-vh-100'}>
            <Header/>
            <div className={'py-3'}>
                {children}
            </div>
        </div>
    );
}