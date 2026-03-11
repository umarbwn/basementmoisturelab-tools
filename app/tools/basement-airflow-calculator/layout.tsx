import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Airflow Calculator – CFM & Fan Size Tool",
    description: "Find the exact CFM & fan size your basement needs. Enter dimensions, humidity & radon risk — get a smart ACH recommendation instantly. Free tool.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `What CFM do I need for a 1,000 sq ft basement?`,
                    answer: `It depends on ceiling height and target ACH. A 1,000 sq ft basement with 8 ft ceilings = 8,000 ft³. At the baseline Smart ACH of 3: (8,000 × 3) ÷ 60 = 400 CFM. At elevated ACH of 6 for higher humidity: 800 CFM — achievable with multiple fans or a high-capacity inline unit.`
                },
                {
                    question: `Is the calculator accurate for finished basements?`,
                    answer: `Yes. The calculator works for any basement configuration. Finished basements with regular occupancy will typically generate higher Smart ACH recommendations due to occupant loads, and may benefit from ERV/HRV systems rather than simple exhaust fans to maintain comfortable temperatures while ventilating.`
                },
                {
                    question: `How is CFM different from ACH?`,
                    answer: `ACH (Air Changes per Hour) is a rate — it describes how many times the total air volume is replaced per hour. CFM (Cubic Feet per Minute) is a flow measurement — it describes the physical volume of air moved per minute. The calculator converts between them using your basement volume: CFM = (Volume × ACH) ÷ 60.`
                },
                {
                    question: `My basement has a radon mitigation system. Do I still need ventilation?`,
                    answer: `Yes. A sub-slab depressurization system (the standard radon mitigation approach) reduces radon entry but doesn't ventilate the basement itself. You still need airflow to manage humidity, CO₂, and other air quality factors. The two systems address different problems and work best together.`
                },
                {
                    question: `Can I use this calculator for a crawl space?`,
                    answer: `The same CFM formula applies to crawl spaces, but the ventilation strategy differs significantly. Crawl spaces are typically ventilated via passive foundation vents (1 sq ft of vent per 150 sq ft of floor area per building code) or, preferably, converted to conditioned unvented crawl spaces with sealed vapor barriers and direct HVAC supply. Use the calculator for CFM sizing but consult crawl space-specific guidelines for system design.`
                }
            ]}/>
            <PostReader slug={'basement-airflow-calculator'}/>
        </div>
    );
}