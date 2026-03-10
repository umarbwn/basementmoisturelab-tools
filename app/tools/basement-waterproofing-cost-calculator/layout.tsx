import React from "react";
import type {Metadata} from "next";
import PostReader from "@/lib/post-reader";
import {FAQJsonLd} from "next-seo";


export const metadata: Metadata = {
    title: "Basement Waterproofing Cost Calculator 2026",
    description:
        "Get an instant basement waterproofing cost estimate. Enter your sq ft, problem type & method — see your price range in seconds. Free & accurate.",
};


export default async function Layout({children}: { children: React.ReactNode }) {

    return (
        <div className="container py-3">
            {children}
            <FAQJsonLd questions={[
                {
                    question: 'How accurate is the Basement Waterproofing Cost Calculator?',
                    answer: 'The calculator provides estimates based on industry-standard per-square-foot pricing ranges. It\'s designed to give you a realistic ballpark figure before consulting with a contractor. Actual costs will vary based on your region, the specific products used, labor rates, and the extent of damage.'
                },
                {
                    question: 'Can I waterproof my basement myself?',
                    answer: 'Some minor interior waterproofing tasks — like applying sealant to small cracks or installing a basic sump pump — can be DIY projects. However, significant issues like foundation cracks, flooding, or exterior waterproofing require professional equipment, expertise, and often permits. For anything beyond minor maintenance, professional installation is strongly recommended.'
                },
                {
                    question: 'How long does basement waterproofing last?',
                    answer: 'Interior sealants: 5–10 years (may need reapplication)\n' +
                        'Interior drainage systems with sump pumps: 10–20+ years with proper maintenance\n' +
                        'Exterior waterproofing membranes: 20–30+ years when properly installed'
                },
                {
                    question: 'Does homeowners insurance cover basement waterproofing?',
                    answer: 'Typically, no. Most homeowners insurance policies treat waterproofing as a maintenance issue rather than damage from a covered event. However, if flooding is caused by a sudden, accidental event (like a burst pipe), some costs may be covered. Always check with your insurance provider.'
                },
                {
                    question: 'What is the best time of year to waterproof a basement?',
                    answer: 'Spring and early summer are popular times since contractors can assess winter damage. However, exterior waterproofing requires dry soil conditions, making late summer and fall ideal. Interior waterproofing can be done year-round.'
                }
            ]}/>
            <PostReader slug={'basement-waterproofing-cost-calculator'}/>
        </div>
    );
}