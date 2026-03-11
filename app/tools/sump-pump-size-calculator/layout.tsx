import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Sump Pump Size Calculator – GPM & HP Finder 2026",
    description: "Enter drainage area, rainfall rate & basin size to get your exact GPM, horsepower & cycle time. Free sump pump sizing tool — get it right first time",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `How do I find the rainfall intensity for my area?`,
                    answer: `For U.S. homeowners, NOAA's Precipitation Frequency Data Server provides rainfall intensity data by location and return period. Search for the "1-hour, 10-year" event to find the intensity a properly designed system should handle. Values typically range from 1.0 inch/hour in the Pacific Northwest to 3.5+ inches/hour in parts of the Gulf Coast and Midwest.`
                },
                {
                    question: `My calculator result shows ¼ HP but the contractor recommends ½ HP. Who's right?`,
                    answer: `Contractors often recommend one size up from the minimum calculated requirement — and this is reasonable. The calculator already applies a 1.5× safety factor, but contractors factor in additional real-world variables: aging discharge lines, potential basin silting, and the cost of a return visit if the smaller pump proves insufficient. A ½ HP pump in a situation that technically needs ¼ HP will simply cycle less frequently and last longer. It's a conservative choice that's hard to criticize.`
                },
                {
                    question: `Can I use this calculator for a crawl space sump pump?`,
                    answer: `Yes, with modification. For crawl spaces, the drainage area should reflect the crawl space floor area plus any surrounding soil that drains toward it. Crawl space pumps often handle lower GPM but may need to run more continuously due to groundwater seepage. The same GPM and horsepower logic applies.`
                },
                {
                    question: `What happens if I oversize my sump pump?`,
                    answer: `An oversized pump empties the basin too quickly, causing short cycling — rapid on-off activation that overheats the motor and dramatically shortens pump life. Bigger is not always better with sump pumps. The goal is a pump that runs for 1–3 minutes per cycle, not one that can empty the basin in 20 seconds.`
                },
                {
                    question: `Should I get a ⅓ HP pump instead of ¼ HP?`,
                    answer: `Many manufacturers offer ⅓ HP as a step between ¼ and ½ HP. The calculator outputs align with standard ¼, ½, ¾, and 1 HP tiers, which are the most widely available. If a ⅓ HP unit meets your calculated GPM requirement, it's a perfectly valid choice — check the manufacturer's performance curve at your actual head height to confirm.`
                },
                {
                    question: `How long do sump pumps last?`,
                    answer: `Quality submersible sump pumps last 7–15 years under normal operating conditions. Pedestal pumps can last 10–25 years. Short cycling, running dry, power surges, and poor water quality (sediment, hard water) all reduce lifespan. A properly sized pump — as calculated by this tool — will outlast an over- or undersized unit by years.`
                }
            ]}/>
            <PostReader slug={'sump-pump-size-calculator'}/>
        </div>
    );
}