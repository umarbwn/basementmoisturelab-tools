import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Moisture Problem Finder – Find the Cause",
    description: "Wet walls, musty smell, or water on your floor? Select your symptoms and instantly discover the most likely cause of your basement moisture. Free.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `Can I have more than one cause at the same time?`,
                    answer: `Yes — and it's actually common. Many basements experience multiple contributing moisture sources simultaneously. A home might have borderline drainage, a hairline crack that worsens each winter, and seasonal condensation issues all at once. The tool's scoring system is designed to surface all active causes, not just the top one.`
                },
                {
                    question: `My tool results show Poor Drainage as the top cause. What should I do first?`,
                    answer: `Start with the cheapest, most accessible fixes: extend downspouts, clean gutters, and check that soil grades away from the foundation. These free or low-cost actions eliminate surface drainage issues. If moisture persists after addressing those, move to subsurface drainage solutions like drain tile repair or replacement.`
                },
                {
                    question: `How is this different from a professional moisture inspection?`,
                    answer: `A professional inspector brings physical diagnostic tools — moisture meters, infrared cameras, and borescopes — and can examine areas not visible to the naked eye. The Basement Moisture Problem Finder is a screening tool that helps you understand your situation and prepare for that conversation. It narrows down the likely cause so you can ask better questions and evaluate contractor recommendations more critically.`
                },
                {
                    question: `Is efflorescence a sign of serious water damage?`,
                    answer: `Efflorescence itself is not structurally damaging — it's simply mineral salt residue left behind as water evaporates. However, it is a reliable indicator that water is actively moving through your foundation walls, which means the underlying drainage or pressure issue needs to be addressed. Left unresolved, the ongoing moisture cycle can lead to concrete spalling, reinforcement corrosion, and mold growth.`
                },
                {
                    question: `Can condensation cause efflorescence?`,
                    answer: `No. Efflorescence requires water to travel through the masonry, carrying dissolved minerals with it. Condensation forms on the surface and doesn't pull minerals from within the wall. If you have both musty smell (suggesting condensation) and efflorescence, you likely have two separate moisture sources active simultaneously.`
                }
            ]}/>
            <PostReader slug={'basement-moisture-problem-finder'}/>
        </div>
    );
}