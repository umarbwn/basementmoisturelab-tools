import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Yard Drainage Slope Calculator – % Ratio & Angle",
    description: "Calculate your yard's slope % ratio & angle — instantly find out if your drainage is Poor, Acceptable, Ideal or Steep. Free & takes 30 seconds.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `What is the minimum yard slope away from the house?`,
                    answer: `Per the International Residential Code, the minimum is 6 inches of drop within the first 10 feet from the foundation — a 5% slope. For areas where this isn't achievable due to site constraints, a minimum of 2% with supplemental drainage is the accepted alternative. The calculator flags anything below 1% as Poor and 1–2% as Acceptable but requiring monitoring.`
                },
                {
                    question: `My yard looks flat — does that mean it has poor drainage?`,
                    answer: `Not necessarily. A 2% slope is nearly imperceptible to the naked eye — it's only about 2.4 inches of drop over 10 feet. The only reliable way to know your yard's actual grade is to measure it and run it through the calculator. Many yards that look flat actually have adequate drainage; others that look flat genuinely are flat and need attention.`
                },
                {
                    question: `Can I use this calculator for a driveway or patio slope?`,
                    answer: `Yes — the slope calculation is identical regardless of the surface. Driveways typically target 1–5% longitudinal slope and 2% cross-slope for drainage. Patios and walkways typically target 1–2% slope away from the structure. Enter your measurements and interpret the result in the context of your specific surface type.`
                },
                {
                    question: `How do I calculate how much topsoil I need to fix a low spot?`,
                    answer: `The slope calculator tells you how much drop you need to achieve over a given distance. To calculate volume: multiply the area (sq ft) by the average fill depth (in feet) to get cubic feet, then divide by 27 for cubic yards. Most landscaping suppliers sell topsoil by the cubic yard.`
                },
                {
                    question: `What if my yard slopes toward the house?`,
                    answer: `A negative slope — toward the foundation rather than away — is the most serious drainage scenario. Any water landing on your yard, plus runoff from neighbors' properties, flows directly toward your foundation. This requires either regrading to reverse the slope, installing a swale or French drain to intercept water before it reaches the house, or both. The calculator will show a positive slope percentage as long as you enter drop as a positive value; if your yard slopes toward the house, your "drop" is actually a rise — and the recommendation will show Poor regardless of the magnitude.`
                },
                {
                    question: `Is a steeper slope always better for drainage?`,
                    answer: `No. Above 5%, erosion risk increases on vegetated surfaces. Above 10%, soil instability becomes a concern without proper ground cover or structural support. The ideal range of 2–5% balances drainage efficiency with erosion control and soil stability.`
                }
            ]}/>
            <PostReader slug={'yard-drainage-slope-calculator'}/>
        </div>
    );
}