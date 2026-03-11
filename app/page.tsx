'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";

type toolCardsProps = {
    label: string,
    description: string,
    link: string,
}

const toolCards: toolCardsProps[] = [
    {
        label: 'Dehumidifier Calculator',
        description: `A Dehumidifier Calculator estimates the right dehumidifier size based on room size and humidity to effectively remove excess moisture.`,
        link: '/tools/dehumidifier-calculator'
    },
    {
        label: 'Basement Humidity Level Checker',
        description: `Monitor and check basement humidity levels to help prevent mold, dampness, and damage, keeping your storage area dry and safe.`,
        link: '/tools/basement-humidity-checker'
    },
    {
        label: 'Basement Waterproofing Cost Calculator',
        description: `Estimate your basement waterproofing cost instantly. Enter your square footage, water problem type, and method to get a personalized price range.`,
        link: '/tools/basement-waterproofing-cost-calculator'
    },
    {
        label: 'Basement Mold Risk Calculator',
        description: `Answer 4 quick questions about your basement's humidity, leaks, smell, and ventilation — and instantly find out if you're at Low, Medium, or High mold risk.`,
        link: '/tools/basement-mold-risk-calculator'
    },
    {
        label: 'Basement Moisture Problem Finder',
        description: `Select the symptoms you see in your basement and instantly find out whether poor drainage, hydrostatic pressure, foundation cracks, or condensation is to blame.`,
        link: '/tools/basement-moisture-problem-finder'
    },
    {
        label: 'Sump Pump Size Calculator',
        description: `Calculate the exact GPM capacity and horsepower your sump pump needs — based on your drainage area, rainfall intensity, and basin dimensions. Imperial & metric supported.`,
        link: '/tools/sump-pump-size-calculator'
    }
];

export default function Page() {


    return (
        <div className={'container min-vh-100'}>
            <div className="row">
                {toolCards.map((card: toolCardsProps, index: number) => (
                    <div key={index} className="col-12 mt-4 col-sm-6 col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="card-title fw-bold">{card.label}</h6>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{card.description}</p>
                            </div>
                            <div className="card-footer d-grid">
                                <Link href={card.link} className="btn btn-primary">Calculate</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}