import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Flood Risk Tool – Check Your Risk Score",
    description: "Enter 24hr rainfall, soil type & slope — get an instant Low, Moderate or High basement flood risk score. Free tool, takes 30 seconds.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `How do I find my area's 24-hour rainfall total?`,
                    answer: `Your nearest weather station's data is available through the National Weather Service (weather.gov) for U.S. locations, Environment Canada for Canadian users, or your country's national meteorological service. Many weather apps display accumulated precipitation totals. For the most accurate input, look for the "precipitation last 24 hours" reading from the nearest official monitoring station.`
                },
                {
                    question: `My soil type is loam but close to clay — should I round up?`,
                    answer: `Yes. When in doubt, scoring conservatively (rounding up to the higher-risk soil type) produces a more protective risk assessment. If your soil is dark, clumps when wet, and drains noticeably slowly after rain, treating it as clay in the calculator is a reasonable conservative choice.`
                },
                {
                    question: `The tool shows High risk but my basement has never flooded. Why?`,
                    answer: `Current conditions may be pushing your theoretical risk high, but your actual outcome depends on your existing defenses — waterproofing quality, sump pump capacity, drainage infrastructure, and foundation integrity. A High score means conditions are unfavorable and your existing system is under stress, not that flooding is guaranteed. Use it as a cue to verify your defenses are operational, not to panic.`
                },
                {
                    question: `Can I use this for a crawl space instead of a basement?`,
                    answer: `Yes. The same three factors — rainfall, soil type, and slope — drive crawl space moisture risk by identical mechanisms. A High score for a basement foundation is equally applicable to a crawl space under the same conditions.`
                },
                {
                    question: `What other factors affect basement flood risk that the tool doesn't cover?`,
                    answer: `The tool captures the three primary site-level environmental drivers. Additional factors not modeled include: proximity to bodies of water or floodplains, municipal drainage system capacity, existing waterproofing system quality, sump pump condition and capacity, foundation age and crack status, and roof drainage coverage. For a complete flood risk picture, use this tool alongside the companion Basement Crack Severity Checker and Sump Pump Size Calculator.`
                }
            ]}/>
            <PostReader slug={'basement-flood-risk-calculator'}/>
        </div>
    );
}