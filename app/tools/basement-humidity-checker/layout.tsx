// app/layout.tsx
import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Humidity Level Checker – Free Online Tool",
    description:
        "Check basement moisture, condensation & mold risk in seconds. Free tool + expert tips to protect your home before damage starts.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: 'What is the ideal humidity level for a basement?',
                    answer: 'The ideal relative humidity for a basement is between 30% and 50%. Levels between 50–60% are a caution zone worth monitoring closely. Anything above 60% RH is considered problematic and creates conditions that actively support mold growth, dust mite proliferation, and structural material degradation. In summer, maintaining below 60% without a dehumidifier can be very difficult in most climates.'
                },
                {
                    question: 'What inputs does the tool need?',
                    answer: 'Just two: your current relative humidity (%) and your basement temperature (°F). That\'s it. You can get the humidity reading from an inexpensive hygrometer available at any hardware store for $10–$30. No account, no download, and no technical knowledge required.'
                },
                {
                    question: 'How often should I check my basement moisture levels?',
                    answer: 'At minimum, check your basement humidity once a month. During high-risk seasons — summer (peak outdoor humidity) and spring (snowmelt and heavy rain) — weekly checks are advisable. If you\'ve had water intrusion issues before, consider installing a continuous humidity monitor or smart sensor that alerts you automatically when levels exceed your threshold.'
                },
                {
                    question: 'Can I rely on an online tool for humidity checks?',
                    answer: 'Yes — with one caveat. Our Basement Humidity Level Checker is excellent for instant risk assessment, mold probability guidance, and actionable recommendations. It\'s based on established humidity thresholds used by the EPA and ASHRAE. For clinical precision, pair the tool with a physical hygrometer in your basement. For properties with known water damage history or during home purchase inspections, a professional assessment is always recommended.'
                },
                {
                    question: 'Why does temperature matter in addition to humidity?',
                    answer: 'Temperature directly affects how dangerous a given humidity level is. Mold and bacteria thrive in warm, moist environments. A basement at 65% humidity and 58°F poses a lower immediate risk than one at 65% humidity and 76°F — the warmth accelerates microbial growth significantly. Our tool applies this temperature modifier to give you a more accurate real-world risk rating than a humidity percentage alone can provide.'
                },
                {
                    question: 'What causes high basement humidity even without visible leaks?',
                    answer: 'Several sources contribute to elevated basement moisture with no obvious water:\n' +
                        '\n' +
                        'Condensation from warm air meeting cooler basement surfaces\n' +
                        'Soil vapor transmission — water vapor migrating up through porous concrete slabs\n' +
                        'Unvented dryers releasing humid exhaust air indoors\n' +
                        'Stored wet items like firewood, gardening soil, or damp boxes\n' +
                        'Poor HVAC drainage from air conditioner condensate lines'
                },
                {
                    question: 'At what humidity level does mold start growing?',
                    answer: 'Mold typically begins growing on surfaces when relative humidity at the surface level exceeds 70% for 24–48 hours or more. Because surface humidity can be higher than the ambient air reading (especially on cold walls and pipes), mold growth can begin even when your hygrometer reads 55–60% RH in the open air. This is why the 50% threshold is the recommended action point — not just the mold-appearance point.'
                }
            ]}/>
            <PostReader slug={'basement-humidity-checker'}/>
        </div>
    );
}