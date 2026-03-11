import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Crack Severity Checker – Low to Critical",
    description: "Enter your crack's length, width, pattern & moisture level — instantly find out if it's Low, Moderate, High or Critical severity. Free tool.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: `Are all basement cracks a sign of foundation failure?`,
                    answer: `No. The majority of basement cracks — particularly narrow vertical cracks in poured concrete walls — are normal results of concrete shrinkage and minor settlement. They become concerning when they involve concerning patterns (horizontal, stair-step), significant width (above ¼ inch), active moisture infiltration, or visible displacement. The checker scores all four factors together to give you a holistic picture.`
                },
                {
                    question: `My crack scored Low but it has moisture. Should I be concerned?`,
                    answer: `Yes — even a low overall score with moisture present warrants attention. Moisture at a crack means water is actively finding a path through your foundation, which will worsen over time through freeze-thaw cycling and continued hydrostatic pressure. Seal the crack promptly and check your exterior drainage and grading.`
                },
                {
                    question: `How wide is "too wide" for a DIY fix?`,
                    answer: `Cracks narrower than ⅛ inch (0.125 inches) can often be handled with quality crack filler products. Cracks between ⅛ and ¼ inch may be injectable with DIY kits if vertical and stable. Any crack wider than ¼ inch, or any crack with a concerning pattern regardless of width, should have professional evaluation before repair.`
                },
                {
                    question: `Can I paint or seal over a crack instead of repairing it?`,
                    answer: `Surface sealants and waterproofing paint do not repair cracks — they mask them temporarily. Water under pressure will find the crack and eventually force through any surface coating. Proper repair requires filling the crack through its full depth, not coating the surface.`
                },
                {
                    question: `My basement is in a new home. Is cracking normal?`,
                    answer: `Some cracking in new construction is expected as concrete cures and the structure undergoes initial settlement. Hairline vertical cracks within the first 2–5 years are common. However, horizontal cracking, significant widths, or rapid progression in new construction warrants immediate contact with your builder and potentially an independent structural engineer, as it may indicate construction defects.`
                },
                {
                    question: `How often should I inspect my basement for cracks?`,
                    answer: `Twice per year at minimum — once in spring after freeze-thaw season and once in fall after summer heat. Also inspect after any significant seismic activity, after unusually heavy rainfall periods, and following any major excavation or construction near your property.`
                }
            ]}/>
            <PostReader slug={'basement-crack-severity-checker'}/>
        </div>
    );
}