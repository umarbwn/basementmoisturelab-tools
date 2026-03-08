import type {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Basement Dehumidifier Size Calculator (Find Right Size)",
    description: "Calculate the right basement dehumidifier size in seconds. Enter room size & humidity level to get the ideal pint capacity for your basement.",
};

type propsType = {
    children: React.ReactNode;
}

export default function Layout(props: propsType) {
    const {children} = props;
    return <>{children}</>;
}
