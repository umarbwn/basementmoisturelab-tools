import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Mold Risk Calculator – Check Your Risk Now",
    description: "Is your basement growing mold? Check humidity, leaks, odor & ventilation — get your free Low, Medium, or High mold risk score instantly.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `How accurate is the Basement Mold Risk Calculator?`,
                    answer: `The calculator is based on the four primary environmental factors that mold professionals use to assess risk. It's designed as an educational screening tool — not a substitute for a professional inspection. A High score strongly suggests you should seek professional assessment; a Low score indicates currently favorable conditions, not a guarantee of zero mold.`
                },
                {
                    question: `My score is Low, but I can still see mold. What should I do?`,
                    answer: `Visible mold means mold is present regardless of the score. The calculator assesses risk based on current environmental conditions. If mold is already visible, skip the risk assessment and move directly to remediation. Small areas (under 10 sq ft) can sometimes be self-remediated; larger infestations require a professional.`
                },
                {
                    question: `How often should I use this calculator?`,
                    answer: `At minimum, once per season. Run it immediately after any significant water event (heavy rainfall, flooding, burst pipe), after completing waterproofing or ventilation improvements, or if anyone in your household begins experiencing unexplained respiratory symptoms.`
                },
                {
                    question: `Does homeowners insurance cover mold remediation?`,
                    answer: `It depends. Most policies cover mold remediation only if the mold resulted from a sudden, covered event — like a burst pipe. Mold caused by long-term moisture or neglected leaks is typically excluded. Check your policy and document conditions thoroughly with photos and dates.`
                },
                {
                    question: `What's the difference between mold testing and mold inspection?`,
                    answer: `A visual mold inspection involves a professional physically examining your basement for visible mold, moisture staining, and conducive conditions. Mold testing (air sampling or surface swabs) identifies the presence, type, and concentration of mold spores. Testing is more expensive and not always necessary — a thorough visual inspection by a qualified professional is often sufficient to guide remediation decisions.`
                }
            ]}/>
            <PostReader slug={'basement-mold-risk-calculator'}/>
        </div>
    );
}