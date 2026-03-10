'use client'

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "@/app/_components/Header";
import React, {useEffect} from "react";

type baseLayoutProps = {
    children?: React.ReactNode;
}

export function BaseLayout({children}: baseLayoutProps) {
    useEffect(() => {
        // This only runs on the client (browser)
        import("bootstrap/dist/js/bootstrap.bundle" as any);
    }, []);


    return (
        <>
            <Header/>
            {children}
        </>
    );
}